import { useQuery } from "@tanstack/react-query";
import { TextInput, Select, Label, Button, Spinner,Pagination } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaEye } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
const EmRequestAsset = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [event, setEvent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filterPaymentStatus = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setPaymentStatus(value);
    }
  };
  const handleEvent = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setEvent(e.target.value);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const {
    data: users = { data: [], totalItems: 0, totalPages: 1 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", search, paymentStatus, event, currentPage],
    queryFn: async () => {
      const queryParams = {};
      if (search.trim() !== "") {
        queryParams.fullName = search;
      }
      if (paymentStatus !== "default") {
        queryParams.paymentStatus = paymentStatus;
      }
      if (event !== "default") {
        queryParams.event = event;
      }
      const response = await axiosPublic.post(
        `find-users?page=${currentPage}&limit=10`,
        queryParams
      );
      return response.data;
    },
  });
  useEffect(() => { 
    if (users && users.totalPages !== undefined) {
        setTotalPages(users.totalPages);
    }
}, [users]);
  console.log(users.data);
  const allData = users?.data || [];
  const handlePaymentStatus = async (e, id) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payment = form.get("payment");

    const statusPayment = {
      id,
      payment,
    };

    const response = await axiosPublic.patch("users", statusPayment);

    if (response.data.modifiedCount > 0) {
      refetch();
      document.getElementById(`payment_${id}`).close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Status Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>আবেদনকারীদের তালিকা</title>
      </Helmet>
      <div className="pb-12  overflow-y-scroll">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto pt-16">
            <h1 className="text-center text-3xl font-bold text-black py-8">
              সকল আবেদন কারীদের তালিকা
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
                placeholder="নাম দিয়ে সার্চ করুন"
                shadow
                className="focus:ring-0 w-full "
              />
              <button>
                <IoSearch className="w-24 text-2xl text-white rounded" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
              <div className="shadow-md rounded-xl">
                <Select value={event} onChange={handleEvent}>
                  <option value="default">ইভেন্ট দিয়ে সার্চ করুন</option>
                  <option value="কুরআন তিলাওয়াত">কুরআন তিলাওয়াত</option>
                  <option value="নাত/হামদ/গজল">নাত/হামদ/গজল</option>
                  <option value="দোয়া দরুদ">দোয়া দরুদ</option>
                  <option value="ইসলামিক গল্প/কবিতা">ইসলামিক গল্প/কবিতা</option>
                </Select>
              </div>
              <div className="shadow-md rounded-xl">
                <Select value={paymentStatus} onChange={filterPaymentStatus}>
                  <option value="default">
                    পেমেন্ট স্টাটাস দিয়ে সার্চ করুন
                  </option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
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
                      <tr>
                        <th colSpan="9" className="text-black text-start px-4 py-4">
                        সর্বমোট আবেদনকারী <span>{users.totalItems}</span> জন
                        </th>
                      </tr>
                      <tr className="bg-nav  rounded-l-3xl ">
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          ক্র.
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-center text-base font-medium "
                        >
                          একশন
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          নাম
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-center text-base font-medium "
                        >
                          ইভেন্ট
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          প্রতিষ্ঠানের নাম
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          হোয়াটসএ্যাপ
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          মোবাইল
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          বয়স
                        </th>
                        <th
                          scope="col"
                          className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-3 text-start text-base font-medium "
                        >
                          ক্লাস
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {isLoading ? (
                        <tr>
                          <td colSpan="9" className="text-center py-6">
                            <Spinner
                              aria-label="Extra large spinner example"
                              size="xl"
                            />
                          </td>
                        </tr>
                      ) : allData.length === 0 ? (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-start lg:text-center text-sm text-black py-2 px-4"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        allData.map((asset, index) => {
                          
                          return (
                            <tr key={asset._id} className="">
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-sm font-medium text-black ">
                              {(currentPage - 1) * 10 + index + 1}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-end text-sm font-medium">
                                <div className="flex justify-center items-center gap-2">
                                  <button
                                    className=""
                                    onClick={() =>
                                      document
                                        .getElementById(`${asset._id}`)
                                        .showModal()
                                    }
                                  >
                                    <FaEye className="text-xl lg:text-2xl text-nav" />
                                  </button>
                                  <button
                                    className=""
                                    onClick={() =>
                                      document
                                        .getElementById(`payment_${asset._id}`)
                                        .showModal()
                                    }
                                  >
                                    <TbCoinTakaFilled
                                      className={`text-xl lg:text-3xl ${
                                        asset?.payment === "Paid"
                                          ? "text-green-600"
                                          : "text-yellow-400"
                                      }`}
                                    />
                                  </button>
                                </div>
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm font-medium text-black ">
                                {asset.fullName}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm text-black  flex flex-col justify-center items-center">
                                {asset.events.map((event, index) => (
                                  <div key={index} className="">
                                    <p className="bg-nav text-white px-2 py-1 m-2 rounded-md inline-block">
                                      {event}
                                    </p>
                                  </div>
                                ))}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm text-black ">
                                {asset.school}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm text-black ">
                                {asset.whatsapp}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm text-black ">
                                {asset.mobile}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm text-black ">
                                {asset.age}
                              </td>
                              <td className="px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-2 xl:py-3 2xl:py-4 whitespace-nowrap text-xs lg:text-sm text-black ">
                                {asset.class}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                  <div className="flex justify-start lg:justify-end items-center px-4 mb-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {allData.map((asset) => (
          <dialog id={asset._id} key={asset._id} className="modal">
            <div className="modal-box bg-white">
              <h3 className="font-bold text-lg text-center pb-6 text-black">
                বিস্তারিত তথ্য
              </h3>
              <table className="font-siliguri text-black mb-6 w-full">
                <tbody>
                  <tr className="border-b border-black">
                    <th className="text-start">পেমেন্ট স্টাটাস</th>
                    {asset.payment === "Paid" ? (
                      <td className="text-start ms-4 px-4 rounded-md mb-1 bg-green-600 text-white font-bold inline-block">
                        {asset.payment}
                      </td>
                    ) : (
                      <td className="text-start ms-4 px-4 rounded-md mb-1 bg-yellow-600 text-white font-bold inline-block">
                        {asset.payment}
                      </td>
                    )}
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">আইডি নম্বর</th>
                    <td className="text-start ps-4">{asset.applicantId}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">নাম</th>
                    <td className="text-start ps-4">{asset.fullName}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">বাবার নাম</th>
                    <td className="text-start ps-4">{asset.father}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">প্রতিষ্ঠানের নাম</th>
                    <td className="text-start ps-4">{asset.school}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">হোয়াটসএ্যাপ নাম্বার</th>
                    <td className="text-start ps-4">{asset.whatsapp}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">মোবাইল নাম্বার</th>
                    <td className="text-start ps-4">{asset.mobile}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">বয়স</th>
                    <td className="text-start ps-4 font-lipi">{asset.age}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">ক্লাস</th>
                    <td className="text-start ps-4">{asset.class}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">ইভেন্ট </th>
                    <td className="text-start ps-4 flex flex-col  items-start">
                      {asset.events.map((event, index) => (
                        <p key={index}>{event}</p>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">ইভেন্ট ফি </th>
                    <td className="text-start ps-4 font-lipi text-sm">
                      {asset?.eventFee} টাকা
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">বিকাশ নাম্বার </th>
                    <td className="text-start ps-4">{asset.bkash}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">ট্রানজেকশন নাম্বার </th>
                    <td className="text-start ps-4">
                      {asset.transactionNumber}
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="text-start">ঠিকানা </th>
                    <td className="text-start ps-4 font-lipi text-sm">
                      {asset.address}
                    </td>
                  </tr>
                </tbody>
                
              </table>
              <div className="flex justify-center items-center gap-2">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => document.getElementById(asset._id).close()}
                >
                  বাতিল
                </button>
              </div>
            </div>
          </dialog>
        ))}
        {allData.map((asset) => (
          <dialog
            id={`payment_${asset._id}`}
            key={`payment_${asset._id}`}
            className="modal"
          >
            <div className="modal-box bg-white">
              <h3 className="font-bold text-lg text-center pb-6 text-black">
                পেমেন্ট স্টাটাস আপডেট করুন
              </h3>
              <form onSubmit={(e) => handlePaymentStatus(e, asset._id)}>
                <div className="mb-2">
                  <Select
                    id="payment"
                    name="payment"
                    defaultValue={asset?.payment}
                  >
                    <option value={`Pending`}>Pending</option>
                    <option value={`Paid`}>Paid</option>
                  </Select>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <button className="bg-nav text-white px-4 py-2 rounded-md">
                    আপডেট
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() =>
                      document.getElementById(`payment_${asset._id}`).close()
                    }
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        ))}
      </div>
    </>
  );
};

export default EmRequestAsset;
