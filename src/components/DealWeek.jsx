import dealImg from "../assets/images/time-bg2.jpg";
const timer = [
  { value: "29", label: "Days" },
  { value: "22", label: "Hrs" },
  { value: "47", label: "Mins" },
  { value: "45", label: "Secs" },
];

const DealWeek = () => {
  return (
    <section className="py-12 bg-[#f7f3ea] mx-4 sm:mx-8 lg:mx-16">

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10">

         <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">

          {/* Left Content */}

          <div className="flex flex-col items-center text-center">

            <h2 className="text-5xl font-bold text-[#252525]">
              Deal Of The Week
            </h2>

            <div className="w-20 h-[3px] bg-[#E7AB3C] mt-5"></div>

            <p className="text-gray-500 mt-8 leading-8 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore.
            </p>

            <div className="mt-8">
              <span className="text-3xl font-bold text-[#E7AB3C]">
                $35.00
              </span>

              <span className="text-lg text-gray-700">
                {" "} / HandBag
              </span>
            </div>

            {/* Countdown */}

            <div className="flex justify-center flex-wrap gap-4 mt-10">

              {timer.map((item) => (

                <div
                  key={item.label}
                  className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-lg shadow
      flex flex-col items-center justify-center"
                >

                  <h3 className="text-4xl font-bold text-[#E7AB3C]">
                    {item.value}
                  </h3>

                  <p className="text-lg uppercase text-gray-400 tracking-wider mt-1">
                    {item.label}
                  </p>

                </div>

              ))}

            </div>
            {/* Shop Button */}

            <button
              className="mt-12 px-10 py-4 bg-[#E7AB3C]
  text-white text-sm font-semibold uppercase
  hover:bg-[#d89d32] duration-300"
            >
              Shop Now
            </button>

          </div>

          {/* Right Image */}

          <div
            className="h-[300px] sm:h-[400px] lg:h-[550px] bg-no-repeat bg-center lg:bg-right
            bg-contain"
            style={{
              backgroundImage: `url(${dealImg})`,
            }}
          ></div>

        </div>

      </div>

    </section>
  );
};

export default DealWeek;