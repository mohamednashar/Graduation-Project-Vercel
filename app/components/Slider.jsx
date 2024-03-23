"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CardDefault } from "./Card";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const Slider = () => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  return (
    <Swiper
      className="md:!mx-28"
      navigation={{ prevEl, nextEl }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={1}
      slidesPerView={1}
    >
      <div
        className="swiper-button-prev !text-[#66bfbf] hover:!text-[#4e9999] transition-all duration-200"
        ref={(node) => setPrevEl(node)}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="bg-[#bee3e2] !rounded-full !w-7 !h-7 !p-2"
        />
      </div>

      <div
        className="swiper-button-next !text-[#66bfbf] hover:!text-[#4e9999] transition-all duration-200"
        ref={(node) => setNextEl(node)}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className="bg-[#bee3e2] !rounded-full !w-7 !h-7 !p-2"
        />
      </div>

      <div>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Control"}
          code={"Control-CSE"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"AI"}
            code={"AI-CSE"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Data Structure"}
            code={"DS-CSE"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Algorithms"}
            code={"Algo-CSE"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Data Base"}
            code={"DB-CSE"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Software Engineering"}
            code={"SW-CSE"}
          />
        </SwiperSlide>
      </div>
    </Swiper>
  );
};

export default Slider;
