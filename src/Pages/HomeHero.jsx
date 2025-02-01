import { useQuery } from "@tanstack/react-query";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const HomeHero = () => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleApplicantLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const loginID = form.get("loginID").trim();
    if (!/^\d{3}$/.test(loginID)) {
      setError("আইডি অবশ্যই ইংরেজিতে সংখ্যায় লিখতে হবে  এবং ৩ সংখ্যার হতে হবে ");
      return;
    }
    setError("");
    try {
     
      // Make the Axios request and wait for the response
      await axiosPublic.get(`profile/${loginID}`)
      .then(res =>{
       
        if(res.data.user ==false){
          setError("আপনি ভূল আইডি নম্বর দিয়েছেন");
          return;
        }
        // If the response is successful, redirect to the profile page
        navigate(`/profile/${loginID}`);
        document.getElementById("login").close();

      })
      
    } catch (err) {
      // Handle error if API request fails
      console.error("Error fetching profile:", err);
      setError("সিস্টেমে কিছু সমস্যা ঘটেছে, আবার চেষ্টা করুন");
    }
    
    
  }
  
  return (
    <div className="w-11/12 mx-auto rounded-b-3xl bg-white pt-32 mb-12">
      <h1 className="text-center text-3xl text-nav font-siliguri font-black">
        মহানবীর শিক্ষা - ২০২৫ ইং{" "}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-12">
        <Link to="/form" className="bg-nav hover:bg-blue-600 p-4 rounded-3xl">
          <h1 className="text-center font-lipi text-white font-extrabold text-xl py-4">
            অডিশনের জন্য রেজিস্ট্রেশন করুন
          </h1>
        </Link>
        <button
          onClick={() =>
            document.getElementById(`login`).showModal()
          }
          className="bg-nav hover:bg-blue-600 p-4 rounded-3xl"
        >
          <h1 className="text-center font-lipi text-white font-extrabold text-xl py-4">
            প্রোফাইল লগ ইন
          </h1>
        </button>
        <Link className="bg-nav hover:bg-blue-600 p-4 rounded-3xl">
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
              <button className="bg-nav text-white px-4 py-2 rounded-md">
               লগ ইন
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => document.getElementById(`login`).close()}
              >
                বাতিল
              </button>
            </div>
          </form>

        </div>
      </dialog>
    </div>
  );
};

export default HomeHero;
