import { Button, Label, TextInput } from "flowbite-react";
import join from "../assets/join.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { LogInUser, setUser, LogInWIthGoogle, } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    setEmailError("");
    setPasswordError("");
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    let isError = false;
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
    if (isError) {
      return;
    }
    LogInUser(email, password)
      .then((result) => {
        setUser(result.user);
        axiosPublic.get(`/users/${result.user.email}`)
        .then((response) => {
          const employee = response.data.role==="employee";
          const user = response.data.role==="user";
          const hr = response.data.role==="hr";
          const isHrPaymentPending = response.data.paymentStatus==="pending";
          const isHrPaymentPaid = response.data.paymentStatus==="paid";
          if (employee || user) {
            navigate( "/employee");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Logged in",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          else if(hr && isHrPaymentPending) {
            navigate( "/payment");
          }
          else if(hr && isHrPaymentPaid) {
            navigate( "/hr");
          }
        })
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
  const handleGoogleLogIn =  () => {
    LogInWIthGoogle()
      .then((result) => {
        setUser(result.user);
        axiosPublic.get(`/users/${result.user.email}`)
        .then((response) => {
          const employee = response.data.role==="employee";
          const user = response.data.role==="user";
          const hr = response.data.role==="hr";
          const isHrPaymentPending = response.data.paymentStatus==="pending";
          const isHrPaymentPaid = response.data.paymentStatus==="paid";
          if (employee || user) {
            navigate("/employee");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Logged in",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          else if(hr && isHrPaymentPending) {
            navigate( "/payment");
          }
          else if(hr && isHrPaymentPaid) {
            navigate("/hr");
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        Swal.fire({
          position: "center",
          icon: "error",
          title: { errorCode },
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <>
      <Helmet>
        <title>Login | AssetOrbit</title>
      </Helmet>
      <div className="py-12 px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center items-center ">
            <div className="w-full max-w-xl">
              <div className="pb-12">
                <h1 className="text-nav font-bold text-3xl text-center">
                  Log In
                </h1>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

                <Button type="submit" className="bg-nav">
                  Login
                </Button>
              </form>
            </div>
            <div className="max-w-xl w-full">
              <div className="w-full">
                <button
                  type="submit"
                  className=" outline outline-1 outline-nav rounded-md py-2 my-4 bg-white w-full "
                  onClick={handleGoogleLogIn}
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

export default Login;
