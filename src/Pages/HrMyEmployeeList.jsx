import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
const HrMyEmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `my-employee?email=${user?.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });
  return (
    <>
      <Helmet>
        <title> My Employee List</title>
      </Helmet>
      <div className="pb-12">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-3xl font-bold text-black py-4">
              My Employee List
            </h1>
          </div>
        </div>
        <div className="w-11/12 mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 gap-4">
            {employees.map((team) => (
              <div className="flex flex-col bg-white border shadow-sm rounded-xl pb-0" key={team._id}>
                <img
                  className="w-full h-auto rounded-t-xl"
                  src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
                  alt="Card Image"
                />
                <div className="rounded-2xl py-2">
                  <h3 className="text-lg text-center font-bold text-gray-800 dark:text-white">
                    {team.fullName}
                  </h3>
                </div>
                <div className="bg-nav border-t rounded-b-xl py-2 px-4  md:px-5 ">
                  <p className="text-center text-white">{team.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HrMyEmployeeList;
