import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";
import join from "../assets/join.png";
import { Datepicker } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
const imgHostingKey = import.meta.env.VITE_imgHosting;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const JoinAsHR = () => {
  const navigate = useNavigate();
  const { createUser, LogInWIthGoogle,setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [nameError, setNameError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [logoError, setLogoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dobError, setDobError] = useState("");
  const [packageError, setPackageError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    let isError = false;
    const form = new FormData(e.target);
    const fullName = form.get("fullName");
    const companyName = form.get("companyName");
    const email = form.get("email");
    const password = form.get("password");
    const dob = form.get("dob");
    const OfferPackage = form.get("package");
    const companyLogoFile = e.target["companyLogo"].files[0];
    const photoFile = e.target["photo"].files[0];
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    setNameError("");
    setCompanyNameError("");
    setLogoError("");
    setEmailError("");
    setPasswordError("");
    setDobError("");
    setPackageError("");
    setPhotoError("");
    if (!fullName) {
      setNameError("Full Name is required");
      isError = true;
    }
    if (!companyName) {
      setCompanyNameError("Company Name is required");
      isError = true;
    }
    if (!companyLogoFile) {
      setLogoError("Company Logo is required");
      isError = true;
    }
    if (!email) {
      setEmailError("Email is required");
      isError = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      isError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be 6 character long");
      isError = true;
    } else if (!passwordRegx.test(password)) {
      setPasswordError(
        "Password must include at least one uppercase & one lowercase letter."
      );
      isError = true;
    }
    if (!dob) {
      setDobError("Date of Birth is required");
      isError = true;
    }
    if (!OfferPackage) {
      setPackageError("Package is required");
      isError = true;
    }
    if (!photoFile) {
      setPhotoError("Your photo is required");
      isError = true;
    }
    if (isError) {
      return;
    }
    const logoFormData = new FormData();
    logoFormData.append("image", companyLogoFile);
    const logoRes = await axiosPublic.post(imgHostingApi, logoFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imgLink = logoRes.data.data.display_url;
    const photoFormData = new FormData();
    photoFormData.append("image", photoFile);
    const photoRes = await axiosPublic.post(imgHostingApi, photoFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const photoLink = photoRes.data.data.display_url;
    const hrManager = {
      fullName: fullName,
      companyName: companyName,
      companyLogo: imgLink,
      email: email,
      password: password,
      dob: dob,
      photo: photoLink,
      package: OfferPackage,
      role: "hr",
      paymentStatus: "pending",
    };
    createUser(email, password)
      .then((data) => {
        axiosPublic.post("users", hrManager).then((res) => {
          if (res.data.insertedId) {
            setUser(data.user);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/hr");
          }
        });
        e.target.reset();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message ? "Invalid Email or Password" : error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleSignUpWithGoogle = () => {
    LogInWIthGoogle().then((res) => {
      const result = res.user;
      const name = result.displayName;
      const email = result.email;
      const user = {
        fullName: name,
        email: email,
        photo: result.photoURL,
        role: "hr",
        paymentStatus: "pending",
      };
      axiosPublic.post("users", user).then((res) => {
        if (!res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data.insertedId) {
          setUser(result);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/hr");
        }
      });
    });
  };
  return (
    <>
      <Helmet>
        <title>Join as hr manager</title>
      </Helmet>
      <div className="py-12 px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center items-center ">
            <div className="w-full max-w-xl">
              <div className="pb-12">
                <h1 className="text-nav font-bold text-3xl text-center">
                  Join as HR Manager
                </h1>
              </div>
              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="fullName" value="Full Name" />
                  </div>
                  <TextInput
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Your Full Name"
                    shadow
                  />
                </div>
                {nameError && (
                  <p className="py-1 text-red-600 text-sm ">{nameError}</p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="companyName" value="Company Name" />
                  </div>
                  <TextInput
                    id="companyName"
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                    shadow
                  />
                </div>
                {companyNameError && (
                  <p className="py-1 text-red-600 text-sm ">
                    {companyNameError}
                  </p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="file-upload" value="Company Logo" />
                  </div>
                  <FileInput id="file-upload" name="companyLogo" />
                </div>

                {logoError && (
                  <p className="py-1 text-red-600 text-sm ">{logoError}</p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    shadow
                  />
                </div>
                {emailError && (
                  <p className="py-1 text-red-600 text-sm ">{emailError}</p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    shadow
                  />
                </div>
                {passwordError && (
                  <p className="py-1 text-red-600 text-sm ">{passwordError}</p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="dob" value="Date of Birth" />
                  </div>
                  <Datepicker name="dob" shadow />
                </div>
                {dobError && (
                  <p className="py-1 text-red-600 text-sm ">{dobError}</p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="photo-upload" value="Your Photo" />
                  </div>
                  <FileInput id="photo-upload" name="photo" />
                </div>
                {photoError && (
                  <p className="py-1 text-red-600 text-sm ">{photoError}</p>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="package" value="Select your  package" />
                  </div>
                  <Select id="package" name="package">
                    <option value="">select one</option>
                    <option>5 Members for $5</option>
                    <option>10 Members for $8</option>
                    <option>15 Members for $15</option>
                  </Select>
                </div>
                {packageError && (
                  <p className="py-1 text-red-600 text-sm ">{packageError}</p>
                )}
                <Button type="submit" className="bg-nav">
                  Signup
                </Button>
              </form>
            </div>
            <div className="max-w-xl w-full">
              <div className="w-full">
                <button
                  type="submit"
                  className=" outline outline-1 outline-nav rounded-md py-2 my-4 bg-white w-full "
                  onClick={handleSignUpWithGoogle}
                >
                  <div className="flex flex-row gap-4 items-center justify-center ">
                    <FcGoogle className="text-3xl" />
                    <span className={"font-semibold"}>Signup with Google</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src={join} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinAsHR;
