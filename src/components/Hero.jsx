import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import hero1 from "../assets/images/hero-women.webp";
import hero2 from "../assets/images/hero-man.webp";

import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: hero2,
    category: "Men's Collection",
    title: "Black Friday",
    description: (
      <>
        Discover our latest men's collection, featuring stylish designs,
        premium quality, and fashion for every occasion.
      </>
    ),
    alt: "Men's Collection - Black Friday Fashion",
  },
  {
    id: 2,
    image: hero1,
    category: "Women's Collection",
    title: "Summer Fashion",
    description: (
      <>
        Explore our latest women's collection, featuring elegant styles,
        fresh trends, and fashion made for every occasion.
      </>
    ),
    alt: "Women's Collection - Summer Fashion",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
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
        {slides.map((item, index) => (
          <SwiperSlide key={item.id}>

            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">

              {/* Hero Image */}
              {/* <img 
                src={item.image} 
                alt={item.alt} 
                width={1920} 
                height={700} 
                decoding="async" 
                fetchPriority={index === 0 ? "high" : "low"} 
                loading={index === 0 ? "eager" : "lazy"} 
                className="absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-center" 
              />  */}

              <img
                src={item.image}
                alt={item.alt}
                width={1920}
                height={700}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                className="hidden sm:block absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-center"
              />

              {/* Hero Content */}
              {/* <div className="relative z-10 flex h-full items-center"> */}
              <div className="relative z-10 flex h-full items-center justify-center sm:justify-start">

                {/* <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-4"> */}
                <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 flex justify-center sm:block">

                  {/* <div className="w-full max-w-[210px] sm:max-w-[390px] lg:max-w-[520px]"> */}
                  <div className="w-full max-w-[280px] sm:max-w-[390px] lg:max-w-[520px] text-center sm:text-left">

                    <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#E7AB3C] text-xs sm:text-sm font-semibold">
                      {item.category}
                    </p>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-tight lg:leading-none font-bold mt-3 sm:mt-5">
                      {item.title}
                    </h1>

                    <p className="mt-4 max-w-[200px] mx-auto text-xs leading-5 text-gray-600 sm:mt-7 sm:max-w-[390px] sm:mx-0 sm:text-sm sm:leading-7">
                      {item.description}
                    </p>

                    <Link
                      to="/shop"
                      className="mt-8 sm:mt-9 inline-block bg-[#B77900] px-6 py-3 text-xs font-semibold uppercase text-white duration-300 hover:bg-[#A66A00] sm:px-8 sm:py-4 sm:text-sm"
                    >
                      SHOP NOW
                    </Link>

                  </div>
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