import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_URL);
    try {
      const response = await axios.post(
        // "https://fashio-backend-seven.vercel.app/api/form/login",
        // "http://localhost:8000/api/form/login",
        `${import.meta.env.VITE_API_URL}/form/login`,

        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);

      navigate("/", {
        state: {
          success: true,
        },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userId",
        response.data.userId
      );

    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/50">

      <div className="bg-white w-[450px] rounded-lg p-8 shadow-xl">

        {/* Tabs */}

        <div className="flex justify-center gap-10 mb-8">

          <Link
            to="/login"
            className="text-orange-500 border-b-2 border-orange-500 pb-2 font-semibold"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="text-gray-500 hover:text-orange-500 pb-2"
          >
            Sign Up
          </Link>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-4 mb-5 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-4 mb-6 outline-none"
          />

          <button
            className="w-full bg-orange-500 text-white py-4 rounded hover:bg-orange-600 duration-300"
          >
            Login
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

export default Login;