import about from "../assets/about.jpg";
const About = () => {
  return (
    <div className="w-11/12 bg-nav rounded-3xl mx-auto my-12 ">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className=" bg-white px-4 py-0 lg:py-12 rounded-s-none lg:rounded-s-full ms-12">
          <div className="ps-0 lg:ps-28 flex flex-col justify-center">
            <h1 className="text-nav text-4xl font-bold py-6 ">About Us</h1>
            <p className="py-4 text-black">
              At Asset Orbit, we’re transforming the way businesses manage their
              assets and optimize resource allocation. Our Asset Management
              System is built to empower HR managers and employees with an
              intuitive platform to track, organize, and manage both returnable
              and non-returnable assets effortlessly.
            </p>
            <p className="py-4 text-black">
              From laptops and desks to pens and paper, our system ensures every
              resource is accounted for, reducing inefficiencies and enhancing
              productivity. With secure access, real-time tracking, and
              insightful reporting, Asset Orbit bridges the gap between employee
              needs and company resources.
            </p>
            <p className="py-4 text-black">
              Whether you’re managing a team of five or fifty, our scalable
              subscription plans are designed to fit businesses of all sizes.
              Join us in reshaping asset management with innovative solutions
              that save time and enhance operational efficiency.
            </p>
          </div>
        </div>

        <div className="">
          <img src={about} alt="" className=" h-full w-full  rounded-r-3xl hidden xl:block" />
        </div>
      </div>
    </div>
  );
};

export default About;
