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
                  `px-7 h-14 flex items-center duration-300 ${isActive
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
                  `px-7 h-14 flex items-center duration-300 ${isActive
                    ? "bg-[#E7AB3C] text-white"
                    : "hover:bg-[#E7AB3C]"
                  }`
                }
              >
                SHOP
              </NavLink>
            </li>

            <Link to="/#men-collection">
              <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
                MENS
              </li>
            </Link>

            <Link to="/#women-collection">
              <li className="px-7 h-14 flex items-center hover:bg-[#E7AB3C] duration-300">
                WOMENS
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

            <li className="border-t border-gray-600">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block p-4 duration-300 ${isActive
                    ? "bg-[#E7AB3C]"
                    : "active:bg-[#E7AB3C]"
                  }`
                }
              >
                HOME
              </NavLink>
            </li>

            <li className="border-t border-gray-600">
              <NavLink
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block p-4 duration-300 ${isActive
                    ? "bg-[#E7AB3C]"
                    : "active:bg-[#E7AB3C]"
                  }`
                }
              >
                SHOP
              </NavLink>
            </li>

            <li className="border-t border-gray-600">
              <Link
                to="/#women-collection"
                onClick={() => setMenuOpen(false)}
                className="block p-4 active:bg-[#E7AB3C] duration-300"
              >
                WOMEN'S
              </Link>
            </li>

            <li className="border-t border-gray-600">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block p-4 active:bg-[#E7AB3C] duration-300"
              >
                CONTACT
              </Link>
            </li>

          </ul>
        )}

      </div>

    </nav>
  );
};

export default Navbar;