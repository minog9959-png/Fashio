import { useState } from "react";
import banner from "../assets/images/man-large.jpg";
import man1 from "../assets/images/man-1.jpg";
import man2 from "../assets/images/man-2.jpg";
import man3 from "../assets/images/man-3.jpg";
import man4 from "../assets/images/man-4.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
    FaHeart,
    FaShoppingBag
} from "react-icons/fa";

const tabs = [
    "Clothing",
    "HandBag",
    "Shoes",
    "Accessories",
];

const products = [
    {
        id: 1,
        image: man1,
        category: "Bag",
        name: "Leather Mutiple Pocket",
        price: "$15.00",
        sale: true,
    },
    {
        id: 2,
        image: man2,
        category: "Shoes",
        name: "Levis Shoes",
        price: "$25.00",
    },
    {
        id: 3,
        image: man3,
        category: "Jacket",
        name: "Leather Jacket",
        price: "$20.00",
    },
    {
        id: 4,
        image: man4,
        category: "Shirt",
        name: "Winter Shirt",
        price: "$20.00",
    },
];

const WomenCollection = () => {

    const [activeTab, setActiveTab] = useState("Clothing");

    return (
        <section className="py-20">

            <div className="max-w-[1200px] mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Right Side */}

                    <div className="lg:col-span-3">

                        {/* Heading */}

                        <div className="flex flex-col min-[550px]:flex-row min-[550px]:items-center gap-8 mb-10">
                            <h2 className="text-2xl lg:text-3xl font-bold shrink-0">
                                Men's Collection
                            </h2>

                            {/* Tabs */}

                            <div className="flex flex-wrap gap-4 lg:gap-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-2 border-b-2 duration-300 ${activeTab === tab
                                                ? "border-[#E7AB3C] text-[#E7AB3C]"
                                                : "border-transparent hover:text-[#E7AB3C]"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Product Slider */}

                        {/* <Swiper
                            modules={[Pagination]}
                            spaceBetween={25}
                            slidesPerView={3}
                        > */}

                        <div className="relative px-8 mt-8">
                            <Swiper className="product-slider pb-16"
                                modules={[Navigation, Pagination, Autoplay]}
                                // slidesPerView={3}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                spaceBetween={25}
                                loop={true}
                                speed={800}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    nextEl: ".product-next",
                                    prevEl: ".product-prev",
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                            >

                                {products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="group bg-white rounded-lg">

                                            {/* Image */}
                                            <div className="relative overflow-hidden rounded-lg">

                                                {product.sale && (
                                                    <span
                                                        className="absolute
top-4
left-4
z-30
bg-green-500
text-white
px-3
py-1
text-xs
font-semibold
rounded
pointer-events-none"
                                                    >
                                                        SALE
                                                    </span>
                                                )}

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-[330px] object-cover transition duration-500 group-hover:scale-105"
                                                />

                                                {/* Heart */}
                                                <button
                                                    className="absolute top-4 right-4 z-30
      w-10 h-10 rounded-full bg-white shadow
      flex items-center justify-center
      opacity-0 group-hover:opacity-100
      duration-300 hover:text-[#E7AB3C]"
                                                >
                                                    <FaHeart />
                                                </button>

                                                {/* Bottom Bar */}

                                                <div
                                                    className="absolute bottom-0 left-0
w-full
h-14
z-20
translate-y-[100%]
group-hover:translate-y-0
transition-transform
duration-300
flex"
                                                >

                                                    {/* Shopping Bag */}

                                                    <button
                                                        className="w-14 bg-[#E7AB3C] text-white
        flex justify-center items-center py-4"
                                                    >
                                                        <FaShoppingBag />
                                                    </button>

                                                    {/* Quick View */}

                                                    <button
                                                        className="flex-1 bg-white 
        font-semibold hover:bg-[#252525]
        hover:text-white duration-300"
                                                    >
                                                        + Quick View
                                                    </button>

                                                </div>

                                            </div>

                                            {/* Product Info */}

                                            <div className="text-center my-5">

                                                <p className="text-xs uppercase tracking-[3px] text-gray-400">
                                                    {product.category}
                                                </p>

                                                <h3 className="mt-2 text-xl font-medium hover:text-[#E7AB3C] duration-300">
                                                    {product.name}
                                                </h3>

                                                <p className="mt-2 text-3xl font-bold text-[#E7AB3C]">
                                                    {product.price}
                                                </p>

                                            </div>

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Previous */}
                            <button
                                className="product-prev absolute -left-5 top-1/2 -translate-y-1/2
  z-20 w-11 h-11 rounded-full bg-white border border-gray-200
  flex items-center justify-center
  hover:bg-[#E7AB3C] hover:text-white duration-300"
                            >
                                <FaChevronLeft />
                            </button>

                            {/* Next */}
                            <button
                                className="product-next absolute -right-5 top-1/2 -translate-y-1/2
  z-20 w-11 h-11 rounded-full bg-white border border-gray-200
  flex items-center justify-center
  hover:bg-[#E7AB3C] hover:text-white duration-300"
                            >
                                <FaChevronRight />
                            </button>

                        </div>
                    </div>

                    {/* Left Banner */}
                    <div
                        className="relative h-[620px] bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${banner})`,
                        }}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                            <h2 className="text-5xl font-bold text-white">
                                Men's
                            </h2>

                            <button className="mt-5 bg-white px-8 py-3 font-semibold uppercase hover:bg-[#E7AB3C] hover:text-white duration-300">
                                Discover More
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WomenCollection;