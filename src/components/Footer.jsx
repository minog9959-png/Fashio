import logo from "../assets/images/footer-logo.png";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPinterestP,
} from "react-icons/fa";

import payment from "../assets/images/payment-method.png";

// import newletter subscription
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Footer = () => {

    // newletter subscription hooks
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // newletter subscription Submit Handle
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Email Required",
                text: "Please enter your email address.",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/newsletter`,
                { email }
            );

            Swal.fire({
                icon: "success",
                title: "Subscribed!",
                text: response.data.message,
                timer: 2000,
                showConfirmButton: false,
            });

            setEmail("");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Subscription Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-[#191919] text-white pt-20 overflow-hidden">

            <div className="max-w-[1320px] mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                    {/* Column 1 */}
                    <div className="lg:col-span-4">

                        <img
                            src={logo}
                            alt="Logo"
                            className="mb-8"
                        />

                        <ul className="space-y-5 text-gray-400">

                            <li className="flex gap-3">
                                <FaMapMarkerAlt className="text-[#E7AB3C] mt-1" />
                                60-49 Road 11378 New York
                            </li>

                            <li className="flex gap-3">
                                <FaPhoneAlt className="text-[#E7AB3C] mt-1" />
                                +65 11.188.888
                            </li>

                            <li className="flex gap-3">
                                <FaEnvelope className="text-[#E7AB3C] mt-1" />
                                hello@example.com
                            </li>

                        </ul>

                        <div className="flex gap-4 mt-10">

                            <div className="w-10 h-10 rounded-full bg-[#303030] flex justify-center items-center hover:bg-[#E7AB3C] duration-300 cursor-pointer">
                                <FaFacebookF />
                            </div>

                            <div className="w-10 h-10 rounded-full bg-[#303030] flex justify-center items-center hover:bg-[#E7AB3C] duration-300 cursor-pointer">
                                <FaInstagram />
                            </div>

                            <div className="w-10 h-10 rounded-full bg-[#303030] flex justify-center items-center hover:bg-[#E7AB3C] duration-300 cursor-pointer">
                                <FaTwitter />
                            </div>

                            <div className="w-10 h-10 rounded-full bg-[#303030] flex justify-center items-center hover:bg-[#E7AB3C] duration-300 cursor-pointer">
                                <FaPinterestP />
                            </div>

                        </div>

                    </div>

                    {/* Column 2 */}
                    <div className="lg:col-span-3">

                        <h3 className="text-xl font-semibold mb-6">
                            Information
                        </h3>

                        <ul className="space-y-4 text-gray-400">
                            <li className="hover:text-[#E7AB3C] cursor-pointer">My Account</li>

                            <Link to="/contact">
                            <li className="hover:text-[#E7AB3C] cursor-pointer mb-4">Contact</li>
                            </Link>

                            <Link to="/shop">
                            <li className="hover:text-[#E7AB3C] cursor-pointer">Shop</li>
                            </Link>

                        </ul>

                    </div>

                    {/* Column 3*/}
                    <div className="lg:col-span-4">

                        <h3 className="text-xl font-bold leading-tight mb-6">
                            Join Our Newsletter Now
                        </h3>

                        <p className="text-gray-400 leading-8 mb-5">
                            Get E-mail updates about our latest shop and special offers.
                        </p>

                        <form className="flex w-full"
                            onSubmit={handleNewsletterSubmit}>

                            <input
                                type="email"
                                placeholder="Enter Your Mail"
                                className="flex-1 min-w-0 h-14 px-5 bg-[#303030] text-white outline-none"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />

                            <button type="submit" disabled={loading}
                                className="h-14 px-8 shrink-0 bg-[#E7AB3C] text-white font-semibold hover:bg-[#d89d32] duration-300">
                                {/* SUBSCRIBE */}
                                {
                                    loading ? "SUBSCRIBING...." : "SUBSCRIBE"
                                }
                            </button>

                        </form>

                    </div>

                </div>

                <div className="border-t border-gray-700 mt-16 py-6">

                    <div className="max-w-[1320px] mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-5">

                        <p className="text-gray-400 text-sm text-center md:text-left">
                            Copyright ©2026 All rights reserved
                        </p>

                        {/* <img
                            src={payment}
                            alt="Payment"
                            className="h-7 object-contain"
                        /> */}

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;