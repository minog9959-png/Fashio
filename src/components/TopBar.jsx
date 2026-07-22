import {
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaUser,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    // console.log("Logout clicked");
     localStorage.removeItem("token");
     localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side */}
          <div className="flex flex-col sm:flex-row items-center">
            {/* Address */}
            <div className="flex items-center gap-2 py-4 pr-6 border-r border-gray-200 text-[15px] text-gray-900">
              <FaPhoneAlt className="text-gray-900 text-sm" />
              <span>+65 11.199.989</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 py-4 pl-6 text-[15px] text-gray-900 tracking-wide">
              <FaEnvelope className="text-gray-900" />
              <span>hellofashi@gmail.com</span>
            </div>

          </div>

          {/* Right Side */}
          <div className="flex items-center">

            {/* Social Icons */}
            <div className="flex items-center gap-5 py-4 pr-6 border-r border-gray-200">
              <FaFacebookF className="cursor-pointer text-gray-900 hover:text-pink-500 duration-300 text-sm" />
              <FaTwitter className="cursor-pointer text-gray-900 hover:text-pink-500 duration-300 text-sm" />
              <FaLinkedinIn className="cursor-pointer text-gray-900 hover:text-pink-500 duration-300 text-sm" />
              <FaPinterestP className="cursor-pointer text-gray-900 hover:text-pink-500 duration-300 text-sm" />
            </div>

            {/* Language */}
            <div className="px-6 py-4 border-r border-gray-200">
              <select className="text-sm text-gray-900 outline-none bg-transparent cursor-pointer">
                <option>English</option>
                <option>Urdu</option>
              </select>
            </div>

            {/* Login */}
            {!token ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-4 cursor-pointer hover:text-pink-500 duration-300 text-sm text-gray-900"
              >
                <FaUser className="text-xs" />
                <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-4 cursor-pointer hover:text-pink-500 duration-300 text-sm text-gray-900"
              >
                <FaUser className="text-xs" />
                <span>Logout</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;