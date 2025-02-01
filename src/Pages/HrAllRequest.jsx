import { useQuery } from "@tanstack/react-query";
import { TextInput, Select, Button } from "flowbite-react";
import { Helmet } from "react-helmet";
import { IoSearch } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
const HrAllRequest = () => {
    
    const {user}= useAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = user?.email;
    const { data: requestedAssets = [], refetch: refetchRequests } = useQuery({
        queryKey: ["requestedAssets"],
        queryFn: async () => {
          const response = await axiosSecure.get(
            `assets-request?email=${userEmail}`
          );
          return response.data;
        },
        enabled: !!userEmail,
      });
      
  return (
    <>
      <Helmet>
        <title>All request</title>
      </Helmet>
      <div className="pb-12">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-3xl font-bold text-black py-8">
              All Requests
            </h1>
            <div className="flex items-center bg-nav rounded-xl shadow-md">
              <TextInput
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Search Requests by name or email "
                shadow
                className="focus:ring-0 w-full "
              />
              <button>
                <IoSearch className="w-24 text-2xl text-white rounded" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl w-11/12 mx-auto my-8 shadow-xl py-2">
          <div className="pt-6 px-4">
            <h1 className={` font-bold text-xl lg:text-3xl text-nav`}>
              Request Lists
            </h1>
          </div>
          <div className="divider divider-neutral"></div>
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
                          Email of requester
                        </th>
                        
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Request Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Additional note
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {requestedAssets.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-sm text-black py-2"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        requestedAssets.map((asset) => {
                          
                          return (
                            <tr key={asset._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                {asset.assetName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {asset.assetType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {asset.requestedBy}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {asset.requestDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {asset.additionalNotes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {asset.status}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex justify-center items-center gap-2">
                                <Button className="bg-nav">Approve</Button>
                                <Button className="bg-red-600">Reject</Button>
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
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default HrAllRequest;
