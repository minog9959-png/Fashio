import { FaSearch, FaHeart, FaShoppingBag, FaChevronDown } from "react-icons/fa";

const Header = () => {
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
                    <div className="flex w-full lg:w-[650px] h-[52px] border border-gray-300 rounded-sm overflow-hidden">

                        {/* Categories */}
                        <button className="flex items-center gap-2 px-6 border-r border-gray-300 font-semibold text-sm">
                            All Categories
                            <FaChevronDown className="text-xs" />
                        </button>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="What do you need?"
                            className="flex-1 px-5 text-sm outline-none"
                        />

                        {/* Search Button */}
                        <button className="flex items-center justify-center gap-2 bg-[#E7AB3C] hover:bg-[#d89d32] text-white px-8 duration-300">
                            <FaSearch className="text-lg"/>
                        </button>

                    </div>

                    {/* Icons */}

                    <div className="flex items-center gap-6">

                        <FaHeart className="text-xl cursor-pointer hover:text-pink-500 duration-300" />

                        <div className="relative cursor-pointer">
                            <FaShoppingBag className="text-xl hover:text-pink-500 duration-300" />

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