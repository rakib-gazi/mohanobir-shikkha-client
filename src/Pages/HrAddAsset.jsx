import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const HrAddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [productNameError, setProductNameError] = useState("");
  const [productTypeError, setProductTypeError] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");
  const handleAddAsset = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const productName = form.get("productName");
    const productType = form.get("productType");
    const productQuantity = form.get("productQuantity");
    const currentDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const listedDate = currentDate;
    setProductNameError("");
    setProductTypeError("");
    setProductQuantityError("");
    let isError = false;
    if (!productName) {
      setProductNameError("Product Name is required");
      isError = true;
    }
    if (!productType) {
      setProductTypeError("Product  Type is required");
      isError = true;
    }
    if (!productQuantity) {
      setProductQuantityError("Product Quantity is required");
      isError = true;
    } else if (isNaN(productQuantity) || productQuantity.trim() === "") {
      setProductQuantityError("Product Quantity must be a number");
      isError = true;
    }

    if (isError) {
      return;
    }
    const asset = {
      productName,
      productType,
      productQuantity: Number(productQuantity),
      listedDate,
      listedBy: user.email,
    };
    axiosSecure.post("assets", asset).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    e.target.reset();
  };
  return (
    <>
      <Helmet>
        <title>Add Asset</title>
      </Helmet>

      <div className="w-11/12 mx-auto">
        <div className="bg-white rounded-b-3xl py-12 px-4 mb-12 shadow-xl">
          <h1 className="text-3xl text-nav font-bold text-center pb-8">
            Add Asset
          </h1>
          <form onSubmit={handleAddAsset} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productName" value="Product Name" />
              </div>
              <TextInput
                id="productName"
                type="text"
                name="productName"
                placeholder="Note Book"
                shadow
              />
            </div>
            {productNameError && (
              <p className="py-1 text-red-600 text-sm ">{productNameError}</p>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productType" value="Product Type" />
              </div>
              <Select id="productType" name="productType">
                <option value="">Select Product Type</option>
                <option>Returnable</option>
                <option>Non-Returnable</option>
              </Select>
            </div>
            {productTypeError && (
              <p className="py-1 text-red-600 text-sm ">{productTypeError}</p>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productQuantity" value="Product Quantity" />
              </div>
              <TextInput
                id="productQuantity"
                type="text"
                name="productQuantity"
                placeholder="Ex: 07"
                shadow
              />
            </div>
            {productQuantityError && (
              <p className="py-1 text-red-600 text-sm ">
                {productQuantityError}
              </p>
            )}
            <Button type="submit" className="bg-nav">
              Add Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HrAddAsset;
