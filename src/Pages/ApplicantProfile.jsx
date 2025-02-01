import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const ApplicantProfile = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");
  console.log(id);
  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`profile/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (user?.user === false) {
      setError("আপনি ভূল আইডি নম্বর দিয়েছেন");
    }
  }, [user]);
  if (isLoading)
    return <p className="text-center font-bold text-red-600">লোড হচ্ছে...</p>;
  console.log(user.user);
  return (
    <div className="w-11/12 mx-auto rounded-b-3xl bg-white pt-32 mb-12">
      {error && (
        <div className="text-center text-3xl text-red-600 font-siliguri font-black pb-12">
          {error}
        </div>
      )}
      {!error && (
        <>
          <h1 className="text-center text-3xl text-nav font-siliguri font-black">
            মহানবীর শিক্ষা - ২০২৫ ইং{" "}
          </h1>
          <p className="text-center text-green-600 font-bold text-lg">
            {" "}
            <span className="text-blue-600">ওয়েলকাম ! </span>
            {user.fullName}
          </p>

          <div className="p-4">
            <h1 className=" text-2xl text-red-600 font-siliguri font-black pb-2">
              নোটিশ বোর্ড:
            </h1>
            <div className="p-4 bg-btn rounded-2xl">
              {user.payment === "Paid" ? (
                <h1 className="text-green-600 font-bold">
                  পেমেন্ট কনফার্মেশন :{" "}
                </h1>
              ) : (
                <h1 className="text-blue-600 font-bold">
                  রেজিস্ট্রেশন কনফার্মেশন :{" "}
                </h1>
              )}

              <div className="divider divider-neutral my-0"></div>

              {user.payment === "Paid" ? (
                <p className="font-semibold text-nav">
                  অভিনন্দন ! মহানবীর শিক্ষা অনুষ্ঠানে অডিশনের জন্য তোমার
                  রেজিস্ট্রেশন ফি পরিশোধিত হয়েছে । অডিশনের তারিখ ও সময়ের জন্য
                  অপেক্ষা কর । তোমাকে হোয়াটসএ্যাপ গ্রুপ, মোবাইল এবং এখানে শীঘ্রই
                  জানিয়ে দেয়া হবে।
                </p>
              ) : (
                <p className="font-semibold text-nav">
                  অভিনন্দন ! মহানবীর শিক্ষা অনুষ্ঠানে অডিশনের জন্য তোমার
                  রেজিট্রেশনের আবেদন সম্পন্ন হয়েছে। পেমেন্টে কনফার্মেশনর জন্য
                  অপেক্ষা কর । তোমার পেমেন্টে কনফার্ম হয়েছে কি না তা শীঘ্রই
                  জানিয়ে দেয়া হবে।
                </p>
              )}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-xl text-center pb-6 text-nav">
              তোমার পরিচিতি
            </h3>
            <table className="font-siliguri text-black mb-6 w-full">
              <tbody>
                <tr className="border-b border-black">
                  <th className="text-start">পেমেন্ট স্টাটাস</th>
                  {user.payment === "Paid" ? (
                    <td className="text-start ms-4 px-4 rounded-md mb-1 bg-green-600 text-white font-bold inline-block">
                      {user.payment}
                    </td>
                  ) : (
                    <td className="text-start ms-4 px-4 rounded-md mb-1 bg-yellow-600 text-white font-bold inline-block">
                      {user.payment}
                    </td>
                  )}
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">আইডি নম্বর</th>
                  <td className="text-start ps-4">{user.applicantId}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">নাম</th>
                  <td className="text-start ps-4">{user.fullName}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">বাবার নাম</th>
                  <td className="text-start ps-4">{user.father}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">প্রতিষ্ঠানের নাম</th>
                  <td className="text-start ps-4">{user.school}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">হোয়াটসএ্যাপ নাম্বার</th>
                  <td className="text-start ps-4">{user.whatsapp}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">মোবাইল নাম্বার</th>
                  <td className="text-start ps-4">{user.mobile}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">বয়স</th>
                  <td className="text-start ps-4 font-lipi">{user.age}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">ক্লাস</th>
                  <td className="text-start ps-4">{user.class}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">ইভেন্ট </th>
                  <td className="text-start ps-4 flex flex-col  items-start">
                    {user?.events?.map((event, index) => (
                      <p key={index}>{event}</p>
                    ))}
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">ইভেন্ট ফি </th>
                  <td className="text-start ps-4 font-lipi text-sm">
                    {user?.eventFee} টাকা
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">বিকাশ নাম্বার </th>
                  <td className="text-start ps-4">{user.bkash}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">ট্রানজেকশন নাম্বার </th>
                  <td className="text-start ps-4">{user.transactionNumber}</td>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-start">ঠিকানা </th>
                  <td className="text-start ps-4 font-lipi text-sm">
                    {user.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicantProfile;
