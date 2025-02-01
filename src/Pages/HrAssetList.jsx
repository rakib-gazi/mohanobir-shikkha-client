import { useQuery } from "@tanstack/react-query";
import { TextInput, Select, Label, Button, ButtonGroup } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const HrAssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [productTypeError, setProductTypeError] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [availability, setAvailability] = useState("");
  const userEmail = user?.email;
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSortOption(e.target.value);
    }
  };
  const handleAssetTypeChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSelectedAssetType(value);
    }
  };
  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setAvailability(e.target.value);
    }
  };

  const { data: assets = [], refetch } = useQuery({
    queryKey: [
      "assets",
      userEmail,
      search,
      selectedAssetType,
      sortOption,
      availability,
    ],
    queryFn: async () => {
      const queryParams = {};
      if (search.trim() !== "") {
        queryParams.productName = search;
      }
      if (selectedAssetType !== "default") {
        queryParams.productType = selectedAssetType;
      }
      if (sortOption !== "default") {
        queryParams.sort = sortOption;
      }
      if (availability !== "default") {
        queryParams.availability = availability;
      }
      const response = await axiosSecure.post("find-assets", queryParams);
      return response.data;
    },
    enabled: !!userEmail,
  });

  const handleUpdateAsset = (e, id) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updateProductName = form.get("updateProductName");
    const updateProductType = form.get("updateProductType");
    const updateProductQuantity = form.get("updateProductQuantity");
    setProductNameError("");
    setProductTypeError("");
    setProductQuantityError("");
    let isError = false;
    if (!updateProductName) {
      setProductNameError("Product Name is required");
      isError = true;
    }
    if (!updateProductType) {
      setProductTypeError("Product  Type is required");
      isError = true;
    }
    if (!updateProductQuantity) {
      setProductQuantityError("Product Quantity is required");
      isError = true;
    } else if (
      isNaN(updateProductQuantity) ||
      updateProductQuantity.trim() === ""
    ) {
      setProductQuantityError("Product Quantity must be a number");
      isError = true;
    }

    if (isError) {
      return;
    }
    const asset = {
      updateProductName,
      updateProductType,
      updateProductQuantity: Number(updateProductQuantity),
      updatedBy: user.email,
    };
    axiosSecure.patch(`assets/${id}`, asset).then((res) => {
      if (res.data.modifiedCount === 1) {
        document.getElementById(id).close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undone this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`assets/${id}?email=${userEmail}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Asset has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Asset List</title>
      </Helmet>
      <div className="pb-12  overflow-y-scroll">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-3xl font-bold text-black py-8">
              Asset List
            </h1>
            <div className="flex items-center bg-nav rounded-xl shadow-md">
              <TextInput
                id="fullName"
                type="text"
                value={search}
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
                placeholder="Search Item by Name"
                shadow
                className="focus:ring-0 w-full "
              />
              <button>
                <IoSearch className="w-24 text-2xl text-white rounded" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
              <div className="shadow-md rounded-xl">
                <Select
                  value={availability}
                  onChange={handleAvailabilityChange}
                >
                  <option value="default">Filter Items by Availability </option>
                  <option value="Available">Available</option>
                  <option value="Out-of-stock">Out-of-stock</option>
                </Select>
              </div>
              <div className="shadow-md rounded-xl">
                <Select
                  value={selectedAssetType}
                  onChange={handleAssetTypeChange}
                >
                  <option value="default">Filter By Asset Type</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </Select>
              </div>
              <div className="shadow-md rounded-xl">
                <Select value={sortOption} onChange={handleSortChange}>
                  <option defaultValue="default">Sort Item</option>
                  <option value="high">Sort By Quantity (High to Low)</option>
                  <option value="low">Sort By Quantity (Low to High)</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl w-11/12 mx-auto my-8 shadow-xl py-2">
          <div className="flex flex-col overflow-hidden">
            <div className="-m-1.5 overflow-x-auto">
              <div className="px-1.5 pb-1.5  min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full ">
                    <thead className="  text-white">
                      <tr className="bg-nav  rounded-l-3xl ">
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Product Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Product Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Date Added
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Availability
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-base font-medium "
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {assets.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-sm text-black py-2"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        assets.map((asset) => (
                          <tr key={asset._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                              {asset.productName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {asset.productType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {asset.productQuantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {asset.listedDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {asset.availability}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <div className="flex justify-center items-center gap-2">
                                <button
                                  onClick={() =>
                                    document
                                      .getElementById(`${asset._id}`)
                                      .showModal()
                                  }
                                >
                                  <FaEdit className="text-xl text-nav" />
                                </button>
                                <button onClick={() => handleDelete(asset._id)}>
                                  <IoTrashBin className="text-xl text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {assets.map((asset) => (
          <dialog id={asset._id} key={asset._id} className="modal">
            <div className="modal-box">
              <div>
                <form
                  onSubmit={(e) => handleUpdateAsset(e, asset._id)}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="updateProductName"
                        value="Update Product Name"
                      />
                    </div>
                    <TextInput
                      id="updateProductName"
                      type="text"
                      defaultValue={asset.productName}
                      name="updateProductName"
                      placeholder="Note Book"
                      shadow
                    />
                  </div>
                  {productNameError && (
                    <p className="py-1 text-red-600 text-sm ">
                      {productNameError}
                    </p>
                  )}
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="updateProductType"
                        value="Update Product Type"
                      />
                    </div>
                    <Select
                      id="updateProductType"
                      name="updateProductType"
                      defaultValue={asset.productType}
                    >
                      <option value="">Update Product Type</option>
                      <option value="Returnable">Returnable</option>
                      <option value="Non-Returnable">Non-Returnable</option>
                    </Select>
                  </div>
                  {productTypeError && (
                    <p className="py-1 text-red-600 text-sm ">
                      {productTypeError}
                    </p>
                  )}
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="updateProductQuantity"
                        value="Update Product Quantity"
                      />
                    </div>
                    <TextInput
                      id="updateProductQuantity"
                      type="text"
                      defaultValue={asset.productQuantity}
                      name="updateProductQuantity"
                      placeholder="Ex: 07"
                      shadow
                    />
                  </div>
                  {productQuantityError && (
                    <p className="py-1 text-red-600 text-sm ">
                      {productQuantityError}
                    </p>
                  )}

                  <div className="flex justify-between items-center gap-2">
                    <Button type="submit" className="bg-nav">
                      Update
                    </Button>
                    <button
                      className="btn bg-red-600 text-white hover:bg-red-600"
                      onClick={() => document.getElementById(asset._id).close()}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        ))}
      </div>
    </>
  );
};

export default HrAssetList;
