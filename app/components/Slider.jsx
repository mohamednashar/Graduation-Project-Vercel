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
      className="w-[80%]"
      navigation={{ prevEl, nextEl }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={1}
      slidesPerView={1}
    >
      <div
        className="swiper-button-prev !text-[#66bfbf] hover:!text-[#f76b8a] transition-all duration-200"
        ref={(node) => setPrevEl(node)}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="bg-[#bee3e2] !rounded-full !w-7 !h-7 !p-2"
        />
      </div>

      <div
        className="swiper-button-next !text-[#66bfbf] hover:!text-[#f76b8a] transition-all duration-200"
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
            courseImg={
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            courseDescription={
              "Design, implement, and manage systems for precise process control and optimization"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"AI"}
            courseImg={
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            courseDescription={
              "Artificial intelligence mimics human intelligence to perform tasks autonomously and intelligently."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Data Structure"}
            courseImg={
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            courseDescription={
              "Data structures organize and store data efficiently for easy access and manipulation."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Algorithms"}
            courseImg={
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            courseDescription={
              "Algorithms are precise instructions for solving problems using logical steps."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Data base"}
            courseImg={
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            courseDescription={
              "Databases store and organize large amounts of data for efficient retrieval."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardDefault
            courseTitle={"Software Engineering"}
            courseImg={
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            courseDescription={
              "Software engineering involves designing, developing, and maintaining software systems efficiently and reliably."
            }
          />
        </SwiperSlide>
      </div>
    </Swiper>
  );
};

export default Slider;
