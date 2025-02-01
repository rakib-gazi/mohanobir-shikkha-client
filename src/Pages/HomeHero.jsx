import { Link } from "react-router-dom";

const HomeHero = () => {
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
      <dialog id="login"  className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center pb-6 text-black">
                বিস্তারিত তথ্য
              </h3>
              
              <div className="flex justify-center items-center gap-2">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => document.getElementById("login").close()}
                >
                  বাতিল
                </button>
              </div>
            </div>
          </dialog>
    </div>
  );
};

export default HomeHero;
