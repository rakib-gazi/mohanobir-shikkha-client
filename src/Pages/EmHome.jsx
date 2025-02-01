import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Calendar } from "rsuite";
import "rsuite/Calendar/styles/index.css";
import useAuth from "../Hooks/useAuth";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const EmHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const userEmail = user?.email;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);
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
  const { data: assets = [], refetch: refetchAssets } = useQuery({
    queryKey: ["assets", userEmail, currentPage],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/assets-pending-request/${userEmail}?page=${currentPage}&limit=4`
      );
      setTotalPages(response.data.totalPages);
      return response.data.data;
    },
    enabled: !!userEmail,
  });

  const { data: monthlyAssets = [] } = useQuery({
    queryKey: ["monthlyAssets", userEmail, currentPage2],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/assets-pending-request/month/${userEmail}?page=${currentPage2}&limit=4`
      );
      setTotalPages2(response.data.totalPages);
      return response.data.data;
    },
    enabled: !!userEmail,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };
  return (
    <>
      <Helmet>
        <title>Employee</title>
      </Helmet>
      {regUser ? (
        <div>
          <div className="w-11/12 mx-auto bg-white rounded-b-2xl">
            <div className=" px-4">
              <h1
                className={` font-bold text-xl lg:text-5xl text-red-600 text-center py-16`}
              >
                Please Contact With Your HR
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-11/12 mx-auto bg-white rounded-b-2xl ">
            <div className="pt-12 px-4">
              <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
                My pending requests
              </h1>
            </div>
            <div className="divider divider-neutral"></div>
            <div className="">
              <div className="flex flex-col overflow-hidden">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="px-1.5 pb-1.5  min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full ">
                        <thead className="  text-white">
                          <tr className="bg-nav  rounded-l-3xl ">
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-base font-medium "
                            >
                              Asset Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-base font-medium "
                            >
                              Asset Type
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-base font-medium "
                            >
                              Status
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-base font-medium "
                            >
                              Request Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                          {assets.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center text-sm text-black py-2"
                              >
                                No data found
                              </td>
                            </tr>
                          ) : (
                            assets.map((asset) => {
                              return (
                                <tr key={asset._id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                    {asset.assetName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    {asset.assetType}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    {asset.status}
                                  </td>
                                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800 ">
                                    {asset.requestDate}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                      {assets.length > 0 && (
                        <div className="flex justify-start lg:justify-end items-center px-4 mb-4">
                          <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto bg-white rounded-2xl my-12 ">
            <div className="pt-6 px-4">
              <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
                My monthly requests
              </h1>
            </div>
            <div className="divider divider-neutral"></div>
            <div className="">
              <div className="flex flex-col overflow-hidden">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="px-1.5 pb-1.5  min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full ">
                        <thead className="  text-white">
                          <tr className="bg-nav  rounded-l-3xl ">
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-base font-medium "
                            >
                              Asset Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-base font-medium "
                            >
                              Asset Type
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-base font-medium "
                            >
                              Status
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-base font-medium "
                            >
                              Requested Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                          {monthlyAssets.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center text-sm text-black py-2"
                              >
                                No data found
                              </td>
                            </tr>
                          ) : (
                            monthlyAssets.map((asset) => {
                              return (
                                <tr key={asset._id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                    {asset.assetName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    {asset.assetType}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    {asset.status}
                                  </td>
                                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800 ">
                                    {asset.requestDate}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                      {assets.length > 0 && (
                        <div className="flex justify-start lg:justify-end items-center px-4 mb-4">
                          <Pagination
                            currentPage={currentPage2}
                            totalPages={totalPages2}
                            onPageChange={handlePageChange2}
                          />
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto bg-white rounded-2xl my-12 ">
            <div className="pt-6 px-4">
              <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
                Calender
              </h1>
            </div>
            <div className="divider divider-neutral"></div>
            <div className="">
              <Calendar bordered />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmHome;
