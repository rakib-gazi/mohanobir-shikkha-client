import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { Navbar, Avatar } from "flowbite-react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import defaultAvatar from "../assets/nav-avatar.jpg";
const Header = () => {
  const { user, setUser, LogOutUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isSticky, setIsSticky] = useState(false);
  const userEmail = user?.email;
  const { data: registeredUser = [] } = useQuery({
    queryKey: ["registeredUser"],
    queryFn: async () => {
      if (!userEmail) return null;
      const response = await axiosPublic.get(`/users/${userEmail}`);
      return response.data;
    },
    enabled: !!userEmail,
  });
  const regEmployee = registeredUser?.role === "employee";
  const regUser = registeredUser?.role === "user";
  const regHr = registeredUser?.role === "hr";
  const isHrPaymentPending = registeredUser.paymentStatus === "pending";
  const isHrPaymentPaid = registeredUser.paymentStatus === "paid";
  const pendingHr = regHr && isHrPaymentPending;
  const paidHr = regHr && isHrPaymentPaid;

  const handleLogOut = () => {
    LogOutUser()
      .then(() => {
        setUser(null);
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
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

  const links = [
    <NavLink
      to="/"
      key="home"
      className={({ isActive }) =>
        `px-3 py-1 rounded-xl font-siliguri text-base lg:text-xl hover:bg-blue-600 hover:text-white  ${
          isActive ? "bg-btn text-black" : "text-white"
        }`
      }
    >
      হোম
    </NavLink>,
    <NavLink
      to="/form"
      key="registration"
      className={({ isActive }) =>
        `px-3 py-1 rounded-xl font-siliguri text-base lg:text-xl hover:bg-blue-600 hover:text-white  ${
          isActive ? "bg-btn text-black" : "text-white"
        }`
      }
    >
      রেজিট্রেশন ফরম
    </NavLink>,
    
  ];

  return (
    <>
      <div className={`bg-nav w-full fixed top-0 z-40 shadow-md`}>
        <Navbar fluid rounded className="bg-nav w-11/12 mx-auto py-4">
          <Link to="/">
            <div>
              <p className="text-white font-siliguri font-bold text-xl lg:text-3xl">
                মহানবীর শিক্ষা
              </p>
            </div>
          </Link>

          <div className="flex md:order-2 gap-2  items-center">
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse className="">
            {links.map((link, index) => (
              <li key={index} className="my-2">
                {link}
              </li>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
