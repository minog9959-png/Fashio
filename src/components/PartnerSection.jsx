import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import logo1 from "../assets/images/logo-carousel-1.png";
import logo2 from "../assets/images/logo-carousel-2.png";
import logo3 from "../assets/images/logo-carousel-3.png";
import logo4 from "../assets/images/logo-carousel-4.png";
import logo5 from "../assets/images/logo-carousel-5.png";

const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
];

const PartnerSection = () => {
    return (
        <section className="bg-[#303030] py-8 mt-18">

            <div className="max-w-[1200px] mx-auto">

                <Swiper
                    modules={[Autoplay]}
                    //   slidesPerView={5}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    loop={true}

                    speed={900}

                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}

                    spaceBetween={40}
                >
                    {logos.map((logo, index) => (
                        <SwiperSlide key={index}>

                            <div className="flex justify-center items-center h-[70px]">

                                <img
                                    src={logo}
                                    alt="Partner Logo"
                                    className="opacity-90 hover:opacity-100 duration-300"
                                />

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

        </section>
    );
};

export default PartnerSection;