import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import hero1 from "../assets/images/hero-1.jpg";
import hero2 from "../assets/images/hero-2.jpg";

const slides = [
  {
    id: 1,
    image: hero1,
    category: "Bag, Kids",
    title: "Black Friday",
    description:
    <>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
    <br/>
    do eiusmod tempor incididunt ut labore et dolore.
    </>
  },
  {
    id: 2,
    image: hero2,
    category: "Women Collection",
    title: "Summer Fashion",
    description:
       <>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
    <br/>
    do eiusmod tempor incididunt ut labore et dolore.
    </>
  },
];

const Hero = () => {
  return (
    <section className="relative">

      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        speed={1200}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="min-h-[500px] sm:min-h-[600px] lg:h-[700px] bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="max-w-[1200px] mx-auto w-full px-5 sm:px-8 lg:px-4">
                <div className="max-w-full sm:max-w-[520px]">
                  <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#E7AB3C] text-xs sm:text-sm font-semibold">
                    {item.category}
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-tight lg:leading-none font-bold mt-4 sm:mt-5">
                    {item.title}
                  </h1>
                  <p className="text-gray-600 text-sm mt-5 sm:mt-7">
                    {item.description}
                  </p>
                  <button
                    className="mt-8 sm:mt-9 bg-[#E7AB3C] text-white
  px-6 sm:px-8 py-3 sm:py-4
  uppercase text-xs sm:text-sm font-semibold
  hover:bg-[#d89d32] duration-300"
                  >
                    SHOP NOW
                  </button>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default Hero;