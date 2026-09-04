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
        <br />
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
        <br />
        fresh trends, and fashion made for every occasion.
      </>
    ),
    alt: "Women's Collection - Summer Fashion",
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
        {slides.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="relative min-h-[500px] sm:min-h-[600px] lg:h-[700px] overflow-hidden">

              {/* Hero Image */}
              <img
                src={item.image}
                alt={item.alt}
                width={1920}
                height={700}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Hero Content */}
              <div className="relative z-10 flex items-center min-h-[500px] sm:min-h-[600px] lg:h-[700px]">
                <div className="max-w-[1200px] mx-auto w-full px-5 sm:px-8 lg:px-4">
                  <div className="max-w-full sm:max-w-[520px]">

                    <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#E7AB3C] text-xs sm:text-sm font-semibold">
                      {item.category}
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-tight lg:leading-none font-bold mt-4 sm:mt-5">
                      {item.title}
                    </h1>

                    <p className="mt-5 max-w-[390px] text-sm leading-7 text-gray-600 sm:mt-7">
                      {item.description}
                    </p>

                    <Link
                      to="/shop"
                      className="mt-8 sm:mt-9 inline-block bg-[#8A5A00] px-6 py-3 text-xs font-semibold uppercase text-white duration-300 hover:bg-[#704900] sm:px-8 sm:py-4 sm:text-sm"
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