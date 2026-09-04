import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#252525]">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Desktop Menu */}
        <div className="flex items-center justify-center">
          <ul className="hidden md:flex items-center text-white">

            {/* HOME */}
            <li className="h-14 flex items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-7 h-14 flex items-center duration-300 ${
                    isActive
                      ? "bg-[#8A5A00] text-white"
                      : "hover:bg-[#8A5A00]"
                  }`
                }
              >
                HOME
              </NavLink>
            </li>

            {/* SHOP */}
            <li className="h-14 flex items-center">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `px-7 h-14 flex items-center duration-300 ${
                    isActive
                      ? "bg-[#8A5A00] text-white"
                      : "hover:bg-[#8A5A00]"
                  }`
                }
              >
                SHOP
              </NavLink>
            </li>

            {/* MENS */}
            <li className="h-14 flex items-center">
              <Link
                to="/#men-collection"
                className="px-7 h-14 flex items-center hover:bg-[#8A5A00] duration-300"
              >
                MENS
              </Link>
            </li>

            {/* WOMENS */}
            <li className="h-14 flex items-center">
              <Link
                to="/#women-collection"
                className="px-7 h-14 flex items-center hover:bg-[#8A5A00] duration-300"
              >
                WOMENS
              </Link>
            </li>

            {/* CONTACT */}
            <li className="h-14 flex items-center">
              <Link
                to="/contact"
                className="px-7 h-14 flex items-center hover:bg-[#8A5A00] duration-300"
              >
                CONTACT
              </Link>
            </li>

          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl p-4"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <FaBars aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden bg-[#252525] text-white">

            {/* HOME */}
            <li className="border-t border-gray-600">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block p-4 duration-300 ${
                    isActive
                      ? "bg-[#8A5A00]"
                      : "active:bg-[#8A5A00]"
                  }`
                }
              >
                HOME
              </NavLink>
            </li>

            {/* SHOP */}
            <li className="border-t border-gray-600">
              <NavLink
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block p-4 duration-300 ${
                    isActive
                      ? "bg-[#8A5A00]"
                      : "active:bg-[#8A5A00]"
                  }`
                }
              >
                SHOP
              </NavLink>
            </li>

            {/* MENS */}
            <li className="border-t border-gray-600">
              <Link
                to="/#men-collection"
                onClick={() => setMenuOpen(false)}
                className="block p-4 active:bg-[#8A5A00] duration-300"
              >
                MENS
              </Link>
            </li>

            {/* WOMENS */}
            <li className="border-t border-gray-600">
              <Link
                to="/#women-collection"
                onClick={() => setMenuOpen(false)}
                className="block p-4 active:bg-[#8A5A00] duration-300"
              >
                WOMENS
              </Link>
            </li>

            {/* CONTACT */}
            <li className="border-t border-gray-600">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block p-4 active:bg-[#8A5A00] duration-300"
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