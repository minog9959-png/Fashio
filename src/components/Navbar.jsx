import { useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="bg-[#252525]">

  <div className="max-w-[1200px] mx-auto px-4">

    {/* Top Row */}

    <div className="flex items-center justify-center">

      {/* Desktop Menu */}

        <ul className="hidden md:flex items-center text-white">
        {/* <li className="px-7 h-14 flex items-center">HOME</li> */}
        <li className="h-14 flex items-center">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `px-7 h-14 flex items-center duration-300 ${
        isActive
          ? "bg-[#E7AB3C] text-white"
          : "hover:bg-[#E7AB3C]"
      }`
    }
  >
    HOME
  </NavLink>
</li>

        {/* <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
          <Link to="/shop">
          SHOP
          </Link>
        </li> */}

<li className="h-14 flex items-center">
  <NavLink
    to="/shop"
    className={({ isActive }) =>
      `px-7 h-14 flex items-center duration-300 ${
        isActive
          ? "bg-[#E7AB3C] text-white"
          : "hover:bg-[#E7AB3C]"
      }`
    }
  >
    SHOP
  </NavLink>
</li>

        <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
          MEN'S
        </li>

        <Link to="/#women-collection">
        <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
          WOMEN'S
        </li>
        </Link>

        {/* <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
          BLOG
        </li> */}

        <Link to="/contact">

         <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
          CONTACT
        </li>
        
        </Link>

      </ul>

      {/* Mobile Menu Button */}

    <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-white text-2xl p-4"
>
  <FaBars />
</button>

    </div>

    {/* Mobile Menu */}

    {menuOpen && (
  <ul className="md:hidden bg-[#252525] text-white">

    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">HOME</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">SHOP</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">COLLECTION</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">MEN'S</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">WOMEN'S</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">PAGES</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300">BLOG</li>
    <li className="p-4 border-t border-gray-600 hover:bg-[#E7AB3C] duration-300f">CONTACT</li>

  </ul>
)}
  </div>

</nav>
    );
};

export default Navbar;