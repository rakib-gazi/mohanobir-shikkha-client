import choose from "../assets/choose.jpg";

const Choose = () => {
  return (
    <div className="w-11/12 bg-nav rounded-3xl mx-auto my-12 ">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="">
          <img src={choose} alt="" className=" h-full w-full  rounded-l-3xl hidden xl:block" />
        </div>
        <div className=" bg-white px-4 py-0 lg:py-12 rounded-r-none lg:rounded-r-full mr-12">
          <div className=" px-2 md:px-4 lg:px-8 flex flex-col justify-center">
            <h1 className="text-nav text-4xl font-bold py-6">Why Choose Us</h1>
            <ul className="list-disc ">
              <li className="py-2 text-black">
                Simplified asset tracking for HR managers and employees.
              </li>
              <li className="py-2 text-black">User-friendly interface for quick setup and navigation.</li>
              <li className="py-2 text-black">Real-time updates and notifications for all asset activities.</li>
              <li className="py-2 text-black">Responsive design for seamless access across all devices.</li>
              <li className="py-2 text-black">Secure data management with environment-protected configurations.</li>
              <li className="py-2 text-black">Scalable subscription packages tailored to your business needs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
