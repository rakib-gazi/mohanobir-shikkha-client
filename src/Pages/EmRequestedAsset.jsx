import { useQuery } from "@tanstack/react-query";
import { TextInput, Select, Label, Button, Pagination } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PDFDownloadLink, Document, Page, Text,View ,StyleSheet,Image} from "@react-pdf/renderer";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const EmRequestedAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [searchByName, setSearchByName] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);
  const [hrEmail, setHrEmail] = useState("");
  const userEmail = user?.email;

  const handleAssetTypeChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSelectedAssetType(value);
    }
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setStatus(e.target.value);
    }
  };

  const { data: assets = [], refetch } = useQuery({
    queryKey: [
      "assets",
      userEmail,
      searchByName,
      selectedAssetType,
      currentPage2,
      status,
    ],
    queryFn: async () => {
      const queryParams = {
        userEmail,
        page: currentPage2,
        limit: 4,
      };

      if (searchByName.trim() !== "") {
        queryParams.productName = searchByName;
      }
      if (selectedAssetType !== "default") {
        queryParams.productType = selectedAssetType;
      }
      if (status !== "default") {
        queryParams.status = status;
      }

      const response = await axiosSecure.post(
        "find-assets-request",
        queryParams
      );

      setTotalPages2(response.data.totalPages);

      return response.data.data;
    },
    enabled: !!userEmail,
  });

  const { data: companyHrEmail = [] } = useQuery({
    queryKey: ["companyHrEmail"],
    queryFn: async () => {
      const response = await axiosSecure.get(`users/employee-hr/${userEmail}`);
      return response.data;
    },
    enabled: !!userEmail,
  });
  const { data: hrWiseCompany = [] } = useQuery({
    queryKey: ["hrWiseCompany"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `users/hr-wise-company/${hrEmail}?email=${userEmail}`
      );
      return response.data;
    },
    enabled: !!userEmail,
  });
  useEffect(() => {
    if (companyHrEmail?.approvedBy) {
      setHrEmail(companyHrEmail.approvedBy);
    }
  }, [companyHrEmail]);
  console.log(hrWiseCompany.companyName);
  const  companyName = hrWiseCompany.companyName;
  const handleCancelRequest = async (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undone this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`assets-request-delete/${requestId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Canceled!",
              text: "Asset has been Canceled.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleReturnAsset = async (assetId) => {
    const returnedAssets = {
      returnStatus: "returned",
      returnBy: userEmail,
    };
    const res = await axiosSecure.patch(
      `/return-asset/${assetId}`,
      returnedAssets
    );
    if (res.data.modifiedCount === 1) {
      Swal.fire({
        icon: "success",
        title: "Asset returned successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      refetchRequests();
    }
  };
  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };
  const AssetPDF = ({ asset,companyName }) => {
    const styles = StyleSheet.create({
      page: {
        backgroundColor: "#ffffff",
        padding: 20,
        fontSize: 12,
        fontFamily: "Helvetica",
      },
      container: {
        width: "100%",
        margin: "auto",
        border: "1 solid #ddd",
        borderRadius: 8,
        padding: 15,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1 solid #ddd",
        paddingBottom: 10,
        marginBottom: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
      logo: {
        width: 50,
        height: 30,
      },
      section: {
        marginBottom: 10,
        padding: 10,
        border: "1 solid #ddd",
        borderRadius: 5,
      },
      sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
      },
      text: {
        marginBottom: 4,
      },
      footer: {
        borderTop: "1 solid #ddd",
        marginTop: 10,
        paddingTop: 10,
        textAlign: "center",
        fontSize: 10,
        color: "#666",
      },
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
  
            {/* Header with Title and Logo */}
            <View style={styles.header}>
              <Text style={styles.title}>Asset Information</Text>
              <Image style={styles.logo} src="/obeo-logo.png" />
            </View>
  
            {/* Company Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Company Information</Text>
              <Text style={styles.text}><Text>Company Name</Text> {companyName}</Text>
              <Text style={styles.text}><Text>Check In:</Text> 22 February 2025</Text>
              <Text style={styles.text}><Text>Check Out:</Text> 25 February 2025</Text>
              <Text style={styles.text}><Text>Booking Date:</Text> 23 January 2025</Text>
              <Text style={styles.text}><Text>Guest Name:</Text> Arnav Sinha</Text>
              <Text style={styles.text}><Text>Room Name:</Text> Superior Single Room</Text>
              <Text style={styles.text}><Text>Total Room:</Text> 01</Text>
              <Text style={styles.text}><Text>Total Night:</Text> 03</Text>
              <Text style={styles.text}><Text>Booking Source:</Text> Expedia</Text>
            </View>
  
            {/* Payment & Pricing */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment & Pricing</Text>
              <Text style={styles.text}><Text>Price (USD):</Text> 154.68 USD</Text>
              <Text style={styles.text}><Text>Exchange Rate:</Text> 115.00 TK</Text>
              <Text style={styles.text}><Text>Total Price (BDT):</Text> 17,788.20 TK</Text>
              <Text style={styles.text}><Text>Total Advance:</Text> 17,788.20 TK</Text>
              <Text style={styles.text}><Text>Total Pay In Hotel:</Text> 0.00 TK</Text>
              <Text style={styles.text}><Text>Payment Method:</Text> Expedia Collects</Text>
            </View>
  
            {/* Room Wise Information & Price Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Room Wise Information & Price Details</Text>
              <Text style={styles.text}><Text>Superior Single Room:</Text> 01</Text>
              <Text style={styles.text}><Text>Price Per Night (1 Room):</Text> 5,929.40 TK</Text>
              <Text style={styles.text}><Text>Total (1 Room 3 Night):</Text> 17,788.20 TK</Text>
            </View>
  
            {/* Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text style={styles.text}><Text>Phone Number:</Text> +86 20 3124 8103</Text>
            </View>
  
            {/* Footer */}
            <View style={styles.footer}>
              <Text>© 2025 Obeo Limited. All rights reserved.</Text>
              <Text>24-01-2025 11:11:34 AM</Text>
            </View>
  
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <>
      <Helmet>
        <title>My Requested Assets</title>
      </Helmet>
      <div className="pb-12 overflow-y-scroll">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-xl lg:text-3xl font-bold text-black py-8">
              My Requested Assets
            </h1>
            <div className="flex items-center bg-nav rounded-xl shadow-md">
              <TextInput
                id="fullName"
                type="text"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
                placeholder="Search Item by Name"
                shadow
                className="focus:ring-0 w-full"
              />
              <button>
                <IoSearch className="w-24 text-2xl text-white rounded" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
              <div className="shadow-md rounded-xl">
                <Select value={status} onChange={handleStatusChange}>
                  <option value="default">
                    Filter Items by Request Status{" "}
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </Select>
              </div>
              <div className="shadow-md rounded-xl">
                <Select
                  value={selectedAssetType}
                  onChange={handleAssetTypeChange}
                >
                  <option value="default">Filter By Asset Type</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl w-11/12 mx-auto my-8 shadow-xl py-2 overflow-x-auto">
          <table className="min-w-full ">
            <thead className="text-white bg-nav">
              <tr>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Asset Type
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Request Date
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Approval Date
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Request Status
                </th>
                <th className="px-6 py-3 text-center text-xs lg:text-base font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assets.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-sm text-black py-2"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                assets.map((asset) => (
                  <tr key={asset._id}>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset.assetName}
                    </td>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset.assetType}
                    </td>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset.requestDate}
                    </td>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset.status === "Approved" ? asset.approvalDate : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset?.returnStatus === "returned"
                        ? "Returned"
                        : asset.status}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center items-center gap-2">
                      {asset.status === "Pending" && (
                        <Button
                          color="failure"
                          onClick={() => handleCancelRequest(asset._id)}
                          className="px-1 lg:px-2 py-0.5 lg:py-1"
                        >
                          Cancel
                        </Button>
                      )}
                      {asset.status === "Approved" &&
                        asset.assetType === "Returnable" && (
                          <Button
                            onClick={() => handleReturnAsset(asset._id)}
                            disabled={asset?.returnStatus === "returned"}
                            className={
                              asset?.returnStatus === "returned"
                                ? "bg-gray-400 cursor-not-allowed"
                                : " bg-blue-600"
                            }
                          >
                            {asset?.returnStatus === "returned"
                              ? "Returned"
                              : " Return"}
                          </Button>
                        )}
                      {asset.status === "Approved" && (
                        <PDFDownloadLink
                          document={<AssetPDF asset={asset} />}
                          fileName={`${asset.assetName}-details.pdf`}
                        >
                          <Button className="bg-nav">Print</Button>
                        </PDFDownloadLink>
                      )}
                    </td>
                  </tr>
                ))
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
    </>
  );
};

export default EmRequestedAsset;
