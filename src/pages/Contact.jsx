import React, { useState } from "react";
import {
  FaPhone,
  FaRegAddressBook,
  FaRegEnvelope,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        formData
      );

      console.log("Contact Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us.",
        confirmButtonColor: "#000",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Error:", error);

      Swal.fire({
        icon: "warning",
        title: "Already Submitted!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonColor: "#000",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="inline-block text-4xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2">
            Contact Us
          </h1>

          <p className="text-gray-500 mt-6">
            Have any questions? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-lg shadow-md p-8">

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              If you have any questions, feedback, or need assistance,
              feel free to contact us. Our team will get back to you
              as soon as possible.
            </p>

            <div className="space-y-5">

              <div>
                <h3 className="font-semibold text-gray-800 flex gap-2">
                  <FaRegAddressBook className="text-yellow-500 text-xl" />
                  Address
                </h3>

                <p className="text-gray-500 mt-1">
                  Lahore, Pakistan
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 flex gap-2">
                  <FaRegEnvelope className="text-yellow-500 text-lg" />
                  Email
                </h3>

                <p className="text-gray-500 mt-1">
                  support@fashio.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 flex gap-2">
                  <FaPhone className="text-yellow-500 text-lg" />
                  Phone
                </h3>

                <p className="text-gray-500 mt-1">
                  +92 300 1234567
                </p>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
