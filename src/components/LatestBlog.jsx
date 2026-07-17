import blog1 from "../assets/images/latest-1.jpg";
import blog2 from "../assets/images/latest-2.jpg";
import blog3 from "../assets/images/latest-3.jpg";

import { FaCalendarAlt, FaComments } from "react-icons/fa";

const blogs = [
    {
        id: 1,
        image: blog1,
        category: "Fashion",
        date: "May 4, 2019",
        comments: 5,
        title: "The Best Street Style From London Fashion Week",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
    },
    {
        id: 2,
        image: blog2,
        category: "Travel",
        date: "May 4, 2019",
        comments: 5,
        title: "Vogue's Ultimate Guide To Autumn/Winter 2019 Shoes",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
    },
    {
        id: 3,
        image: blog3,
        category: "Model",
        date: "May 4, 2019",
        comments: 5,
        title: "How To Brighten Your Wardrobe With A Dash Of Lime",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
    },
];

const LatestBlog = () => {
    return (
        <section className="py-20">

            <div className="max-w-[1200px] mx-auto px-4">

                {/* Heading */}

                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold">
                        Latest Blog
                    </h2>

                    <div className="w-20 h-[3px] bg-[#E7AB3C] mx-auto mt-4"></div>

                </div>

                {/* Blog Cards */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {blogs.map((blog) => (

                        <div key={blog.id} className="group cursor-pointer">

                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-[320px] object-cover rounded-lg"
                            />

                            <div className="mt-6">

                                {/* Meta */}

                                <div className="flex items-center gap-5 text-sm text-gray-500">

                                    <span className="text-[#E7AB3C] font-medium">
                                        {blog.category}
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <FaCalendarAlt />
                                        {blog.date}
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <FaComments />
                                        {blog.comments}
                                    </span>

                                </div>

                                {/* Title */}

                                <h3
                                    className="text-2xl font-semibold mt-4
                  group-hover:text-[#E7AB3C]
                  duration-300"
                                >
                                    {blog.title}
                                </h3>

                                <p className="mt-3 text-gray-500 leading-7 text-[15px]">
                                    {blog.description}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default LatestBlog;