import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const EmTeam = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const userEmail = user?.email;
  const { data: companyInfo = [], refetch } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: async () => {
      const response = await axiosSecure.get(`users/employee-hr/${userEmail}`);
      return response.data;
    },
    enabled: !!userEmail,
  });
  const findHr = companyInfo.approvedBy;
  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await axiosPublic.get(`team/${findHr}`);
      return response.data;
    },
    enabled: !!userEmail,
  });
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="pb-12">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-3xl font-bold text-black py-4">
              My Team
            </h1>
            <p className="text-center px-4 text-black">
              "Meet the passionate team driving innovation and excellence,
              turning challenges into opportunities and ideas into reality."
            </p>
          </div>
        </div>
        <div className="w-11/12 mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 gap-4">
            {teams.map((team) => (
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

export default EmTeam;
