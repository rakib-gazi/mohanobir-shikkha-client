import { Calendar } from "rsuite";
import "rsuite/Calendar/styles/index.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { Avatar } from "flowbite-react";
import av1 from "../assets/avatar1.jpg";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pendingRequests = [], refetch } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `hr-assets-pending-request/${user?.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });
  const { data: limitedAssets = [] } = useQuery({
    queryKey: ["limitedAssets"],
    queryFn: async () => {
      const response = await axiosSecure.get(`limited-assets/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });
  return (
    <div>
      <Helmet>
        <title>Hr Manager</title>
      </Helmet>
      <div className="w-11/12 mx-auto bg-white rounded-b-2xl ">
        <div className="pt-12 px-4">
          <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
            Pending requests
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
                          Availability
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-base font-medium "
                        >
                          Request Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {pendingRequests.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-sm text-black py-2"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        pendingRequests.map((asset) => {
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white rounded-2xl my-12 ">
        <div className="pt-6 px-4">
          <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
            Top most requested items
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
                          Availability
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-base font-medium "
                        >
                          Request Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {pendingRequests.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-sm text-black py-2"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        pendingRequests.map((asset) => {
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white rounded-2xl my-12 ">
        <div className="pt-6 px-4">
          <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
            Limited Stock items
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
                          Quantity
                        </th>

                        
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {limitedAssets.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-sm text-black py-2"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        limitedAssets.map((asset) => {
                          return (
                            <tr key={asset._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                {asset.productName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {asset.productType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {asset.productQuantity}
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
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white rounded-2xl my-12 ">
        <div className="pt-6 px-4">
          <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>Charts</h1>
        </div>
        <div className="divider divider-neutral"></div>
        <div className=" flex justify-center items-center">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={600}
            height={400}
          />
        </div>
      </div>

      <div className="w-11/12 mx-auto bg-white rounded-2xl my-12 ">
        <div className="pt-6 px-4">
          <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
            Meeting Notice
          </h1>
        </div>
        <div className="divider divider-neutral"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 pb-12">
          <div className="bg-btn p-4 rounded-3xl shadow-xl">
            <h1 className="font-bold text-nav">Meeting with John Done</h1>
            <p className="text-sm text-black">8:00 Am to 8:45 Am (UTC)</p>
            <div className="py-4">
              <Avatar.Group>
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar.Counter total={2} href="#" />
              </Avatar.Group>
            </div>
            <p className="text-nav text-sm">On Google meet</p>
            <div className="pt-4">
              <p className="px-6 py-1 border border-nav rounded-full inline-block">
                Employee
              </p>
            </div>
          </div>
          <div className="bg-nav p-4 rounded-3xl shadow-xl">
            <h1 className="font-bold text-white">Meeting with John Done</h1>
            <p className="text-sm text-white">8:00 Am to 8:45 Am (UTC)</p>
            <div className="py-4">
              <Avatar.Group>
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar.Counter total={2} href="#" />
              </Avatar.Group>
            </div>
            <p className="text-white text-sm">On Google meet</p>
            <div className="pt-4">
              <p className="px-6 py-1 border border-white rounded-full inline-block text-white">
                Employee
              </p>
            </div>
          </div>
          <div className="bg-btn p-4 rounded-3xl shadow-xl">
            <h1 className="font-bold text-nav">Meeting with John Done</h1>
            <p className="text-sm text-black">8:00 Am to 8:45 Am (UTC)</p>
            <div className="py-4">
              <Avatar.Group>
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar.Counter total={2} href="#" />
              </Avatar.Group>
            </div>
            <p className="text-nav text-sm">On Google meet</p>
            <div className="pt-4">
              <p className="px-6 py-1 border border-nav rounded-full inline-block">
                Employee
              </p>
            </div>
          </div>
          <div className="bg-nav p-4 rounded-3xl shadow-xl">
            <h1 className="font-bold text-white">Meeting with John Done</h1>
            <p className="text-sm text-white">8:00 Am to 8:45 Am (UTC)</p>
            <div className="py-4">
              <Avatar.Group>
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar img={av1} rounded stacked />
                <Avatar.Counter total={2} href="#" />
              </Avatar.Group>
            </div>
            <p className="text-white text-sm">On Google meet</p>
            <div className="pt-4">
              <p className="px-6 py-1 border border-white rounded-full inline-block text-white">
                Employee
              </p>
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
  );
};

export default HrHome;
