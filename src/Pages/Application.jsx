import { Button, Label, TextInput, Select, Checkbox } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [nameError, setNameError] = useState("");
  const [fatherError, setFatherError] = useState("");
  const [schoolError, setSchoolError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [classError, setClassError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [eventError, setEventError] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [statementChecked, setStatementChecked] = useState(false);
  const [bkashError, setBkashError] = useState("");
  const [transactionNumberError, setTransactionNumberError] = useState("");
  const eventsList = [
    "কুরআন তিলাওয়াত",
    "নাত/হামদ/গজল",
    "দোয়া দরুদ",
    "ইসলামিক গল্প/কবিতা",
  ];
  const handleEventSelection = (event) => {
    const { value, checked } = event.target;

    setSelectedEvents((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((e) => e !== value);
      }
    });
  };
  const handleStatementChange = (e) => {
    setStatementChecked(e.target.checked);
  };
  const numberToBengali = (num) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((digit) => bengaliDigits[parseInt(digit)])
      .join("");
  };
  const eventFee = 100;
  const totalFee = selectedEvents.length * eventFee;
  const totalFeeInBengali = numberToBengali(totalFee);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let isError = false;
    const form = new FormData(e.target);
    const fullName = form.get("fullName");
    const father = form.get("father");
    const school = form.get("school");
    const whatsapp = form.get("whatsapp");
    const mobile = form.get("mobile");
    const age = form.get("age");
    const FClass = form.get("class");
    const address = form.get("address");
    const transactionNumber = form.get("transactionNumber");
    const bkash = form.get("bkash");
    setNameError("");
    setFatherError("");
    setSchoolError("");
    setWhatsappError("");
    setMobileError("");
    setAgeError("");
    setClassError("");
    setAddressError("");
    setEventError("");
    setBkashError("");
    setTransactionNumberError("");
    if (!fullName) {
      setNameError("অবশ্যই আপনার নাম লিখতে হবে");
      isError = true;
    }
    if (!father) {
      setFatherError("অবশ্যই আপনার বাবার নাম লিখতে হবে");
      isError = true;
    }
    if (!school) {
      setSchoolError("অবশ্যই আপনার শিক্ষা প্রতিষ্ঠানের নাম লিখতে হবে");
      isError = true;
    }
    const phoneRegex = /^[0-9]{11}$/;

    if (!whatsapp) {
      setWhatsappError("অবশ্যই হোয়াটস এ্যাপ নাম্বার দিতে হবে");
      isError = true;
    } else if (!phoneRegex.test(whatsapp)) {
      setWhatsappError(
        "হোয়াটসএ্যাপ নাম্বার অবশ্যই ১১ সংখ্যা হতে হবে এবং শুধুমাত্র সংখ্যা দিন"
      );
      isError = true;
    }

    if (!mobile) {
      setMobileError("অবশ্যই মোবাইল নাম্বার দিতে হবে");
      isError = true;
    } else if (!phoneRegex.test(mobile)) {
      setMobileError(
        "মোবাইল নাম্বার অবশ্যই ১১ সংখ্যা হতে হবে এবং শুধুমাত্র সংখ্যা দিন"
      );
      isError = true;
    }
    if (!age) {
      setAgeError("অবশ্যই আপনার বয়স দিতে হবে");
      isError = true;
    }
    if (!FClass) {
      setClassError("অবশ্যই আপনার শ্রেনী দিতে হবে");
      isError = true;
    }
    if (!address) {
      setAddressError("অবশ্যই আপনার ঠিকানা দিতে হবে");
      isError = true;
    }
    if (selectedEvents.length === 0) {
      setEventError("অন্তত একটি ইভেন্ট বেছে নিন");
      isError = true;
    }
    if (!bkash) {
      setBkashError("অবশ্যই বিকাশ নাম্বার দিতে হবে");
      isError = true;
    } else if (!phoneRegex.test(bkash)) {
      setBkashError("বিকাশ নাম্বার অবশ্যই ১১ সংখ্যা হতে হবে");
      isError = true;
    }

    if (!transactionNumber) {
      setTransactionNumberError("অবশ্যই ট্রানজেকশন নাম্বার দিতে হবে");
      isError = true;
    }

    if (isError) {
      return;
    }
    const applicant = {
      fullName,
      father,
      school,
      whatsapp,
      mobile,
      age,
      class: FClass,
      address,
      events: selectedEvents,
      isAgree: statementChecked,
      eventFee: totalFeeInBengali,
      bkash,
      transactionNumber,
      payment: "Pending",
    };

    axiosPublic.post("users", applicant).then((res) => {
      console.log(res.data.user);
      if (res.data.user._id) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `
            <span class="text-2xl text-blue-600 font-bold">অভিনন্দন!</span>
            <span class="text-lg text-nav">আপনার রেজিট্রেশন সম্পন্ন হয়েছে।</span>
            <span class="text-xl text-red-600 font-bold">আপনার আইডি: ${res.data.user.applicantId} </span>
          `,
          
          customClass: {
            title: "text-xl text-nav",
          },
        });
      }
    });
    e.target.reset();
  };
  return (
    <>
      <Helmet>
        <title>আবেদন ফরম</title>
      </Helmet>
      <div className="pb-12 pt-32 px-4 xl:px-0 ">
        <div className="flex flex-col justify-center items-center ">
          <div className="w-full max-w-xl bg-white p-8 rounded-3xl">
            <div className="">
              <h1 className="text-black  text-3xl text-center font-lipi font-black">
                রেজিস্ট্রেশন ফরম
              </h1>
            </div>
            <div className="divider divider-neutral"></div>
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <p className="font-semibold py-2 text-red-600 font-siliguri ">
                {" "}
                নোট: সকল তথ্য বাংলায় দিন (মোবাইল নাম্বার, হোয়াটসএ্যাপ নাম্বার,
                বিকাশ নাম্বার ও ট্রানজেকশন আইডি ব্যাতীত)
              </p>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="fullName"
                    value="নাম"
                    className="text-xl font-siliguri font-semibold"
                  />
                </div>
                <TextInput
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="আপনার নাম লিখুন"
                  shadow
                />
              </div>
              {nameError && (
                <p className="py-1 text-red-600 text-sm ">{nameError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="father"
                    value="পিতার নাম"
                    className="text-xl font-siliguri font-semibold"
                  />
                </div>
                <TextInput
                  id="father"
                  type="text"
                  name="father"
                  placeholder="আপনার পিতার নাম লিখুন"
                  shadow
                />
              </div>
              {fatherError && (
                <p className="py-1 text-red-600 text-sm ">{fatherError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="school"
                    value="প্রতিষ্ঠানের নাম"
                    className="text-xl font-siliguri font-semibold"
                  />
                </div>
                <TextInput
                  id="school"
                  type="text"
                  name="school"
                  placeholder="শিক্ষা প্রতিষ্ঠানের নাম  "
                  shadow
                />
              </div>
              {schoolError && (
                <p className="py-1 text-red-600 text-sm ">{schoolError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="whatsapp"
                    value=""
                    className="text-xl font-siliguri font-semibold"
                  />
                  <Label
                    htmlFor="whatsapp"
                    className="text-xl font-siliguri font-semibold"
                  >
                    <span className="">হোয়াটসএ্যাপ নাম্বার</span>
                    <span className="text-red-600 ps-2 text-sm">
                      (ইংরেজিতে)
                    </span>
                  </Label>
                </div>
                <TextInput
                  id="whatsapp"
                  type="text"
                  name="whatsapp"
                  placeholder=" 01876987622"
                  shadow
                />
              </div>
              {whatsappError && (
                <p className="py-1 text-red-600 text-sm ">{whatsappError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="mobile"
                    className="text-xl font-siliguri font-semibold"
                  >
                    <span className="">মোবাইল নাম্বার</span>
                    <span className="text-red-600 ps-2 text-sm">
                      (ইংরেজিতে)
                    </span>
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
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="age"
                    className="text-xl font-siliguri font-semibold"
                  >
                    <span className="">বয়স</span>
                    <span className="font-lipi text-red-600 ps-2 text-sm">
                      (মেয়েদের বয়স ১০ এর বেশী হলে গ্রহনযোগ্য হবে না)
                    </span>
                  </Label>
                </div>
                <Select id="age" name="age">
                  <option value="">নির্বাচন করুন</option>
                  <option value={`0১`}>০১ </option>
                  <option value={`০২`}>০২</option>
                  <option value={`০৩`}>০৩</option>
                  <option value={`০৪`}>০৪</option>
                  <option value={`০৫`}>০৫</option>
                  <option value={`০৬`}>০৬</option>
                  <option value={`০৭`}>০৭</option>
                  <option value={`০৮`}>০৮</option>
                  <option value={`০৯`}>০৯</option>
                  <option value={`১০`}>১০</option>
                  <option value={`১১`}>১১</option>
                  <option value={`১২`}>১২</option>
                </Select>
              </div>
              {ageError && (
                <p className="py-1 text-red-600 text-sm ">{ageError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="class"
                    value="ক্লাস"
                    className="text-xl font-siliguri font-semibold"
                  />
                </div>
                <Select id="class" name="class">
                  <option value="">নির্বাচন করুন</option>
                  <option value="হিফজ">হিফজ </option>
                  <option value="শিশু">শিশু</option>
                  <option value="প্রথম">প্রথম</option>
                  <option value="দ্বিতীয়">দ্বিতীয়</option>
                  <option value="তৃতীয়">তৃতীয়</option>
                  <option value="চতুর্থ">চতুর্থ</option>
                  <option value="পঞ্চম">পঞ্চম</option>
                  <option value="ষষ্ঠ">ষষ্ঠ</option>
                  <option value="অনান্য">অনান্য</option>
                </Select>
              </div>
              {classError && (
                <p className="py-1 text-red-600 text-sm ">{classError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="address"
                    value="সম্পূর্ণ ঠিকানা"
                    className="text-xl font-siliguri font-semibold"
                  />
                </div>
                <TextInput
                  id="address"
                  type="text"
                  name="address"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  shadow
                />
              </div>
              {addressError && (
                <p className="py-1 text-red-600 text-sm ">{addressError}</p>
              )}
              <div className="mb-2 block">
                <Label
                  htmlFor="event"
                  value="ইভেন্ট নির্বাচন কর"
                  className="text-xl font-siliguri font-semibold"
                />
              </div>
              <div className="flex flex-col gap-2">
                {eventsList.map((event, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`event-${index}`}
                      value={event}
                      checked={selectedEvents.includes(event)}
                      onChange={handleEventSelection}
                    />
                    <Label htmlFor={`event-${index}`}>{event}</Label>
                  </div>
                ))}
              </div>
              {eventError && (
                <p className="py-1 text-red-600 text-sm ">{eventError}</p>
              )}
              <div className="divider divider-neutral"></div>
              <div className="flex flex-col gap-1">
                <p className=" text-red-600 text-sm">
                  আপনার রেজিস্ট্রেশন ফি : {totalFeeInBengali} টাকা
                </p>
                <p className=" text-nav font-extrabold text-sm">
                  বিকাশ নাম্বার (পারসোনাল) : 01601489416 (শুধুমাত্র সেন্ডমানি
                  করুন)
                </p>
                <p className=" text-red-600 text-sm">
                  নির্দেশনা: উক্ত নাম্বারে টাকা পাঠিয়ে যে নম্বার থেকে টাকা
                  পাঠিয়েছেন তার নাম্বার এবং ট্রানজেকশন নাম্বার দিন।
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="bkash"
                    className="text-xl font-siliguri font-semibold"
                  >
                    <span className="">বিকাশ নাম্বার</span>
                    <span className="text-red-600 ps-2 text-sm">
                      (ইংরেজিতে)
                    </span>
                  </Label>
                </div>
                <TextInput
                  id="bkash"
                  type="text"
                  name="bkash"
                  placeholder="01876987622"
                  shadow
                />
              </div>
              {bkashError && (
                <p className="py-1 text-red-600 text-sm ">{bkashError}</p>
              )}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="transactionNumber"
                    value="ট্রানজেকশন আইডি"
                    className="text-xl font-siliguri font-semibold"
                  />
                </div>
                <TextInput
                  id="transactionNumber"
                  type="text"
                  name="transactionNumber"
                  placeholder="BLU8HCQWCY"
                  shadow
                />
              </div>
              {transactionNumberError && (
                <p className="py-1 text-red-600 text-sm ">
                  {transactionNumberError}
                </p>
              )}
              <div className="divider divider-neutral"></div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="statement"
                  checked={statementChecked}
                  onChange={handleStatementChange}
                />
                <Label
                  htmlFor="statement"
                  className={statementChecked ? "text-black" : "text-red-600"}
                >
                  অডিশনে উত্তীর্ণ হয়ে মূল অনুষ্ঠানে অংশগ্রহণের সুযোগ পেলে আপনি
                  কি অনুষ্ঠানের জন্য ঢাকায় আসতে আগ্রহী?
                </Label>
              </div>
              <Button
                type="submit"
                className="bg-nav"
                disabled={!statementChecked}
              >
                আবেদন করুন
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
