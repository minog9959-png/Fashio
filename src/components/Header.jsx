import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaSearch, FaHeart, FaShoppingBag, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
    setSearchKeyword,
}) => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`
            );
            console.log(response.data);

            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    // useEffect(() => {
    //     console.log(categories);
    // }, [categories]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowCategories(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-[1200px] mx-auto px-5 py-7">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    {/* Logo */}
                    <div>
                        <h1 className="text-4xl font-bold tracking-wider">
                            Fashio<span className="text-pink-500">.</span>
                        </h1>
                    </div>

                    {/* Search */}
                    <div ref={dropdownRef} className="relative flex w-full lg:w-[650px] h-[52px] border border-gray-300 rounded-sm">

                        {/* Categories */}
                        <button
                            onClick={() => setShowCategories(!showCategories)}
                            className="flex items-center gap-2 px-6 border-r border-gray-300 font-semibold text-sm"
                        >
                            All Categories
                            <FaChevronDown className="text-xs" />
                        </button>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="What do you need?"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-5 text-sm outline-none"
                        />
                        {/* Search Button */}
                        {/* <button onClick={() => setSearchKeyword(search)} */}
                        <button onClick={() => {
                            navigate("/shop", {
                                state: {
                                    category: "",
                                    search: search,
                                },
                            });
                        }}
                            className="flex items-center justify-center gap-2 bg-[#E7AB3C] hover:bg-[#d89d32] text-white px-8 duration-300">
                            <FaSearch className="text-lg" />
                        </button>

                        {showCategories && (
                            <div className="absolute left-0 top-full mt-1 w-56 bg-white border shadow-lg z-50">

                                {categories.map((category) => (
                                    // <p
                                    //     key={category._id}
                                    //     onClick={() => {
                                    //         console.log(category)
                                    //         setSelectedCategory(category._id);
                                    //         setShowCategories(false);
                                    //     }}
                                    //     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    // >
                                    //     {category.name}
                                    // </p>
                                    <p
                                        key={category._id}
                                        onClick={() => {
                                            // alert(category.name);
                                            console.log(category);
                                            // setSelectedCategory(category._id);
                                            navigate("/shop", {
                                                state: {
                                                    category: category._id,
                                                    search: "",
                                                },
                                            });
                                            setShowCategories(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {category.name}
                                    </p>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Icons */}

                    <div className="flex items-center gap-6">

                        <FaHeart className="text-xl cursor-pointer hover:text-pink-500 duration-300" />

                        <div className="relative cursor-pointer">
                            <Link to="/cart">
                            <FaShoppingBag className="text-xl hover:text-pink-500 duration-300" />
                            </Link>
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </div>

                        <p className="font-semibold">
                            $0.00
                        </p>

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;