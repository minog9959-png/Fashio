import img1 from "../assets/images/insta-1.webp";
import img2 from "../assets/images/insta-2.webp";
import img3 from "../assets/images/insta-3.webp";
import img4 from "../assets/images/insta-4.webp";
import img5 from "../assets/images/insta-5.webp";
import img6 from "../assets/images/insta-6.webp";

import { FaInstagram } from "react-icons/fa";

const images = [img1, img2, img3, img4, img5, img6];

const InstagramSection = () => {
  return (
    <section className="py-20">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

        {images.map((image, index) => (

          <div
            key={index}
            className="relative group overflow-hidden cursor-pointer"
          >

            {/* Image */}

            <img
              src={image}
              alt=""
              width={380}
              height={380}
              loading="lazy"
              decoding="async"
              className="w-full h-[380px] object-cover"
            />

            {/* Overlay */}

            <div
              className="absolute inset-0
              bg-black/40
              opacity-0
              group-hover:opacity-100
              duration-300
              flex flex-col
              items-center
              justify-center"
            >

              <FaInstagram className="text-white text-4xl" />

              <p className="text-white text-xl mt-4 font-medium">
                All_Collections
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default InstagramSection;