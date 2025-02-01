import React from "react";
import { Helmet } from "react-helmet";

const PaymentPage = () => {
  return (
    <>
      <Helmet>
        <title>Payment </title>
      </Helmet>
      <div className="flex justify-center items-center py-20">
        This is Payment Page
      </div>
    </>
  );
};

export default PaymentPage;
