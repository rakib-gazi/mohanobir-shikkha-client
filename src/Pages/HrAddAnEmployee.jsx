import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";
import { Helmet } from "react-helmet";

const HrAddAnEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userEmail = user?.email;
  const { data: users = [], refetch } = useQuery({
    enabled: !!userEmail,
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `users/employee?email=${userEmail}`
      );
      return response.data;
    },
  });
  const handleAddToTeam = (id) => {
    const approveHr = {
      approvedHr: userEmail,
    };
    
    axiosSecure.patch(`users/${id}`, approveHr).then((res) => {
      
      if (res.data.modifiedCount === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleCheckboxChange = (id, isChecked) => {
    setSelectedUsers((prev) =>
      isChecked ? [...prev, id] : prev.filter((userId) => userId !== id)
    );
  };

  const handleAddSelectedToTeam = async () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No users selected",
        text: "Please select at least one user to add.",
      });
      return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Add An Employee</title>
      </Helmet>
      <div className="pb-12">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-3xl font-bold text-black ">
              Add Employee
            </h1>
          </div>
        </div>
        <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 ">
          <div className="bg-nav p-4 rounded-md shadhow-md">
            <h1 className="text-center text-xl text-white font-bold ">
              Total Employee : {users.length}
            </h1>
          </div>
          <div className="bg-nav p-4 rounded-md shadhow-md">
            <h1 className="text-center text-xl text-white font-bold ">
              Package Limit : 5 members
            </h1>
          </div>
          <Link
            to="/hr/increase-limit"
            className="bg-blue-600 hover:bg-nav cursor-pointer  p-4 rounded-md shadhow-md"
          >
            <h1 className="text-center text-md text-white   rounded font-bold  ">
              Increase Package Limit
            </h1>
          </Link>
        </div>
        <div className="bg-white rounded-3xl w-11/12 mx-auto my-8 shadow-xl py-2">
          <div className="pt-4 px-4">
            <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
              All Users
            </h1>
          </div>
          <div className="divider divider-neutral"></div>
          <div className="overflow-x-auto bg-white rounded-b-3xl">
            <table className="table">
              <thead className="bg-nav text-white text-base">
                <tr>
                  <th>
                    <button
                      onClick={handleAddSelectedToTeam}
                      className="btn bg-btn hover:bg-btn text-black "
                    >
                      Add Selected Members to Team{" "}
                    </button>
                  </th>
                  <th>Image</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-sm text-black py-2"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const isApprovedByHR = user.approvedBy === userEmail;
                    return (
                      <tr key={user._id}>
                        <th>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox border border-black rounded-md"
                              onChange={(e) =>
                                handleCheckboxChange(user._id, e.target.checked)
                              }
                            />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-16 w-16">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{user.fullName}</td>
                        <td className="flex justify-center items-center">
                          <button
                            onClick={() => handleAddToTeam(user._id)}
                            className="btn bg-nav text-white hover:bg-blue-600"
                            disabled={isApprovedByHR}
                          >
                            {isApprovedByHR ? "Already in Team" : "Add to Team"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrAddAnEmployee;
