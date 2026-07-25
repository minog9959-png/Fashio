import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          email,
          password,
        }
      );

      console.log("Admin login response:", response.data);

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(
        "Admin login error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/50">

      <div className="bg-white w-[450px] rounded-lg p-8 shadow-xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-2xl font-semibold text-gray-700">
            Admin Login
          </h2>

          <p className="text-gray-400 mt-2">
            Login to access your admin panel
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-4 mb-5 outline-none focus:border-orange-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-4 mb-6 outline-none focus:border-orange-500"
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded hover:bg-orange-600 duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Close */}
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

export default AdminLogin;