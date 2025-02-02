import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const IdRecovery = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [recoverys, setRecoverys] = useState([]);
  const handleRecovery = async (e) => {
    e.preventDefault();
    let isError = false;
    const form = new FormData(e.target);
    const mobile = form.get("mobile").trim();
    setMobileError("");
    const phoneRegex = /^[0-9]{11}$/;
    if (!mobile) {
      setMobileError("অবশ্যই মোবাইল নাম্বার দিতে হবে");
      isError = true;
    } else if (!phoneRegex.test(mobile)) {
      setMobileError(
        "মোবাইল নাম্বার অবশ্যই ১১ সংখ্যা হতে হবে এবং শুধুমাত্র সংখ্যা দিন"
      );
      isError = true;
    }
    if (isError) {
      return;
    }
    setLoading(true);
    try {
      await axiosPublic.get(`recovery/${mobile}`).then((res) => {
        setLoading(false);
        if (res.data.length == 0) {
          setMobileError("এই নাম্বারটি দিয়ে রেজিট্রেশন করা হয় নি");
          return;
        }
        setRecoverys(res.data);
      });
    } catch (err) {
      setMobileError("সিস্টেমে কিছু সমস্যা ঘটেছে, আবার চেষ্টা করুন");
    }
    setLoading(false);
  };

  return (
    <>
    <Helmet>
      <title>আইডি রিকভারি</title>
      <meta name="description" content="তোমার আইডি ভূলে গেছ । এখন ই রিকভারি তোমার আইডি" />
    </Helmet>
    <div className="w-11/12 mx-auto rounded-b-3xl bg-white  mb-12  pb-6 pt-16 md:py-0">
      
      <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat ">
        <div className="py-20 md:py-36 lg:py-52 flex items-center justify-center"></div>
      </div>
      <div className="px-4">
        <h1 className="text-center text-3xl text-nav font-siliguri font-black pt-12">
          আইডি রিকভারী
        </h1>
        <form onSubmit={(e) => handleRecovery(e)}>
          <div className="mb-2">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="mobile"
                  className="text-xl font-siliguri font-semibold"
                >
                  <span className="">মোবাইল নাম্বার</span>
                  <span className="text-red-600 ps-2 text-sm">(ইংরেজিতে)</span>
                </Label>
              </div>
              <TextInput
                id="mobile"
                type="text"
                name="mobile"
                placeholder="01876987622"
                shadow
              />
            </div>
            {mobileError && (
              <p className="py-1 text-red-600 text-sm ">{mobileError}</p>
            )}
          </div>
          <div className="flex justify-between items-center gap-2">
            <button
              className="bg-nav font-bold text-white px-4 py-2 rounded-md flex items-center justify-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span className="loader border-white border-2 border-t-transparent rounded-full w-8 h-8 animate-spin"></span>
              ) : (
                "রিকভারী"
              )}
            </button>
          </div>
        </form>
        {recoverys.length > 0 && (
          <h1 className="text-center text-xl lg:text-3xl  font-siliguri font-black text-red-600 mb-6">
            এখান থেকে তোমার আইডি বের করে নাও
          </h1>
        )}
        <div className="grid grid-cols-1 gap-4">
          {recoverys.map((data) => (
            <div
              key={data._id}
              className="bg-nav p-6 rounded-3xl text-white flex flex-col gap-2"
            >
              <h1 className="font-bold text-xl ">
                <span>আইডি নম্বর: </span>
                {data.applicantId}
              </h1>
              <p className="font-bold font-lipi ">
                <span>নাম: </span>
                {data.fullName}
              </p>
              <p className="font-bold font-lipi">
                পিতা : <span>{data.father}</span>
              </p>
              <p className="font-bold font-lipi">
                মোবাইল : <span>{data.mobile}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default IdRecovery;
