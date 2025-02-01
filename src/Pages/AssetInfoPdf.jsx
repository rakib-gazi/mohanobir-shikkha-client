import React from "react";

const AssetInfoPdf = () => {
  return (
    <div className="  flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-xl font-bold">Hotel Reservation</h1>
          <img src="/obeo-logo.png" alt="Obeo Rooms" className="h-10" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border p-4 rounded-lg">
            <h2 className="font-semibold">Reservation Information</h2>
            <p>
              <strong>Booking Number:</strong> 401684470
            </p>
            <p>
              <strong>Check In:</strong> 22 February 2025
            </p>
            <p>
              <strong>Check Out:</strong> 25 February 2025
            </p>
            <p>
              <strong>Booking Date:</strong> 23 January 2025
            </p>
            <p>
              <strong>Guest Name:</strong> Arnav Sinha
            </p>
            <p>
              <strong>Room Name:</strong> Superior Single Room
            </p>
            <p>
              <strong>Total Room:</strong> 01
            </p>
            <p>
              <strong>Total Night:</strong> 03
            </p>
            <p>
              <strong>Booking Source:</strong> Expedia
            </p>
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="font-semibold">Payment & Pricing</h2>
            <p>
              <strong>Price (USD):</strong> 154.68 USD
            </p>
            <p>
              <strong>Exchange Rate:</strong> 115.00 TK
            </p>
            <p>
              <strong>Total Price (BDT):</strong> 17,788.20 TK
            </p>
            <p>
              <strong>Total Advance:</strong> 17,788.20 TK
            </p>
            <p>
              <strong>Total Pay In Hotel:</strong> 0.00 TK
            </p>
            <p>
              <strong>Payment Method:</strong> Expedia Collects
            </p>
          </div>
        </div>

        <div className="border p-4 rounded-lg mt-4">
          <h2 className="font-semibold">
            Room Wise Information & Price Details
          </h2>
          <p>
            <strong>Superior Single Room:</strong> 01
          </p>
          <p>
            <strong>Price Per Night (1 Room):</strong> 5,929.40 TK
          </p>
          <p>
            <strong>Total (1 Room 3 Night):</strong> 17,788.20 TK
          </p>
        </div>

        <div className="border p-4 rounded-lg mt-4">
          <h2 className="font-semibold">Contact Information</h2>
          <p>
            <strong>Phone Number:</strong> +86 20 3124 8103
          </p>
        </div>

        <div className="border-t pt-4 mt-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Obeo Limited. All rights reserved.</p>
          <p>24-01-2025 11:11:34 AM</p>
        </div>
      </div>
    </div>
  );
};

export default AssetInfoPdf;
