import { useQuery } from "@tanstack/react-query";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const HomeHero = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleApplicantLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const loginID = form.get("loginID").trim();
    if (!/^\d{3}$/.test(loginID)) {
      setError(
        "আইডি অবশ্যই ইংরেজিতে সংখ্যায় লিখতে হবে  এবং ৩ সংখ্যার হতে হবে "
      );
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Make the Axios request and wait for the response
      await axiosPublic.get(`profile/${loginID}`).then((res) => {
        setLoading(false);
        if (res.data.user == false) {
          setError("আপনি ভূল আইডি নম্বর দিয়েছেন");
          return;
        }

        // If the response is successful, redirect to the profile page
        navigate(`/profile/${loginID}`);
        document.getElementById("login").close();
      });
    } catch (err) {
      setError("সিস্টেমে কিছু সমস্যা ঘটেছে, আবার চেষ্টা করুন");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="w-11/12 mx-auto rounded-b-3xl bg-white pt-16 mb-12">
        <div className="bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
          <div className="py-24 md:py-36 lg:py-52 flex items-center justify-center">
            <h1 className="text-center text-3xl text-white inline-block font-siliguri font-black px-6 py-2 rounded-xl"></h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-12">
          <Link to="/form" className="bg-nav hover:bg-blue-600 p-4 rounded-3xl">
            <h1 className="text-center font-lipi text-white font-extrabold text-xl py-4">
              অডিশনের জন্য রেজিস্ট্রেশন করুন
            </h1>
          </Link>
          <button
            onClick={() => document.getElementById(`login`).showModal()}
            className="bg-nav hover:bg-blue-600 p-4 rounded-3xl"
          >
            <h1 className="text-center font-lipi text-white font-extrabold text-xl py-4">
              প্রোফাইল লগ ইন
            </h1>
          </button>
          <Link
            to={`/recovery`}
            className="bg-nav hover:bg-blue-600 p-4 rounded-3xl"
          >
            <h1 className="text-center font-lipi text-white font-extrabold text-xl py-4">
              আইডি রিকভারী
            </h1>
          </Link>
        </div>
        <dialog id="login" className="modal ">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-center pb-6 text-black">
              প্রোফাইল লগ ইন
            </h3>
            <form onSubmit={(e) => handleApplicantLogin(e)}>
              <div className="mb-2">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="loginID"
                      className="text-xl font-siliguri font-semibold"
                    >
                      <span className="">আইডি নম্বর</span>
                      <span className="text-red-600 ps-2 text-sm">
                        (ইংরেজিতে)
                      </span>
                    </Label>
                  </div>
                  <TextInput
                    id="loginID"
                    type="text"
                    name="loginID"
                    placeholder=" এভাবে লিখুন: 057"
                    shadow
                  />
                </div>
                {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
              </div>
              <div className="flex justify-between items-center gap-2">
                <button
                  className="bg-nav text-white px-4 py-2 rounded-md flex items-center justify-center"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <span className="loader border-white border-2 border-t-transparent rounded-full w-8 h-8 animate-spin"></span>
                  ) : (
                    "লগ ইন"
                  )}
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => document.getElementById(`login`).close()}
                  disabled={loading} // Disable cancel button when loading
                >
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div className="w-11/12 mx-auto rounded-3xl bg-white pt-12 mb-12">
        <div className="">
          <h1 className="text-nav  text-xl lg:text-3xl text-center  font-black px-4">
          মাছরাঙা টেলিভিশনের রমজান মাসব্যাপী একটি বিশেষ শিশুতোষ অনুষ্ঠান মহানবীর শিক্ষা। 
          </h1>
        </div>
        <div className="divider divider-neutral my-0"></div>
        <div className="flex flex-col gap-4 px-4 pt-4 pb-8">
          <p className="font-bold font-lipi text-black text-lg">প্রিয়নবী হযরত মুহাম্মদ মোস্তফা সাল্লাল্লাহু আলাইহি ওয়াসাল্লামের জীবনচরিতের নানান বিষয়ে আলোচনা উপস্থাপন করেন দেশবরেণ্য ইসলামী চিন্তাবিদ শাইখুল হাদিস আল্লামা আবুল কাশেম মুহাম্মদ ফজলুল হক (হাফি.)। অনুষ্ঠানে আলোচনার পাশাপাশি দেশের নানান প্রান্ত হতে অডিশনের মাধ্যমে উঠে আসা ক্ষুদে শিশুরা আপন আপন প্রতিভার বিকাশ ঘটান। কেরাত, নাত/হামদ/গজল, দোআ দরুদ, গল্প ও কবিতা আবৃতি পরিবেশনসহ নানান বিষয়ে শিশুদের জন্যে রয়েছে অংশগ্রহণের বিশেষ সুযোগ। </p>
          <p className="font-bold font-lipi text-black text-lg">আপনার শিশুর প্রতিভার প্রতিফলন ঘটাতে দ্রুতই অডিশনের জন্যে রেজিস্ট্রেশন করে নিন। আল্লাহ তাআলা আপনার শিশুর মেধা বাড়িয়ে দিন ৷ আমীন।</p>
          <p className="font-bold  text-blue-600 text-lg">মডারেটর: মাওলানা মিসবাহুল ইসলাম আকিব</p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
