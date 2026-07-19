import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import bcrypt from "bcryptjs";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:8000/api/form/signup",
        // "https://fashio-backend-seven.vercel.app/api/form/signup",
        `${import.meta.env.VITE_API_URL}/api/form/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          newpass: formData.confirmPassword,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      console.log(error);
      console.log(error.response);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/50">

      <div className="bg-white w-[450px] rounded-lg shadow-xl p-8">

        {/* Tabs */}

        <div className="flex justify-center gap-10 mb-8">

          <Link
            to="/login"
            className="text-gray-500 hover:text-orange-500 pb-2"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="text-orange-500 border-b-2 border-orange-500 pb-2 font-semibold"
          >
            Sign Up
          </Link>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-4 mb-4 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-4 mb-4 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-4 mb-4 outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-4 mb-6 outline-none"
          />

          <button className="w-full bg-orange-500 text-white py-4 rounded hover:bg-orange-600 duration-300">
            Create Account
          </button>

        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 text-gray-500 hover:text-black"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default Signup;