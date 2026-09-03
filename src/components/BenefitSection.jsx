import icon1 from "../assets/images/icon-1.png";
import icon2 from "../assets/images/icon-2.png";

const benefits = [
    {
        id: 1,
        icon: icon1,
        title: "Free Shipping",
        text: "For all order over $99",
    },
    {
        id: 2,
        icon: icon2,
        title: "Delivery On Time",
        text: "If good have problems",
    },
    {
        id: 3,
        icon: icon1,
        title: "Secure Payment",
        text: "100% secure payment",
    }
];

const BenefitSection = () => {
    return (
        <section id="benefits">

            <div className="max-w-[1200px] mx-auto px-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    {benefits.map((item) => (

                        <div
                            key={item.id}
                            className="flex items-center gap-5 p-6 border border-gray-200"
                        >

                            {/* Icon */}

                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-12 h-12 object-contain"
                            />

                            {/* Content */}

                            <div>

                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-gray-800 text-[16px] mt-1">
                                    {item.text}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default BenefitSection;