import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import hrSlider from "../assets/hrSlider.png"
import employeeSlider from "../assets/employeeSlider.png"
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const SwiperSlider = () => {
  return (

    <div className="bg-btn">
      <div className="w-11/12 mx-auto px-4">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper  "
        >
          <SwiperSlide className="bg-btn py-12 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-nav text-center lg:text-start">Join As HR Manager</h1>
                <p className="text-black py-4 w-full lg:w-[90%] text-center lg:text-start text-sm lg:text-base">Manage assets effortlessly with tailored tools for tracking, approvals, and inventory control. Choose a package and streamline your team’s operations today!</p>
                <div className="py-2 flex justify-center lg:justify-start">
                  <Link to="/join-as-hr-manager" className="bg-nav py-3 text-white px-6 rounded-xl hover:bg-blue-600">Join as HR manager</Link>
                </div>
              </div>
              <img src={hrSlider} className="h-[250px] md:h-[300px] lg:h-[450px] 2xl:h-[650px] w-full py-4 lg:py-0" />
            </div>

          </SwiperSlide>
          <SwiperSlide className="bg-btn py-12 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-nav text-center lg:text-start">Join As Employee</h1>
                <p className="text-black py-4 w-full lg:w-[90%] text-center lg:text-start text-sm lg:text-base">Request, track, and manage your assigned assets with ease. Simplify your workflow and stay connected with your HR team</p>
                <div className="py-2 flex justify-center lg:justify-start">
                  <Link to="/join-as-employee" className="bg-nav py-3 text-white px-6 rounded-xl hover:bg-blue-600">Join as Employee</Link>
                </div>
              </div>
              <img src={employeeSlider} className="h-[250px] md:h-[300px] lg:h-[450px] 2xl:h-[650px] w-full py-4 lg:py-0" />
            </div>

          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlider;
