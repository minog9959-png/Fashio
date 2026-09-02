import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import app from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = getAuth(app);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(import.meta.env.VITE_API_URL);
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/form/login`,
  //       {
  //         email: formData.email,
  //         password: formData.password,
  //       }
  //     );

  //     console.log("Login Response:", response.data);
  //     console.log("User ID:", response.data.userId);

  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("userId", response.data.userId);

  //     if (location.state?.from === "/cart") {
  //       navigate("/cart", { replace: true });
  //     } else {
  //       navigate("/", { replace: true });
  //     }

  //   } catch (error) {
  //     console.log("Login Error:", error);

  //     alert(
  //       error.response?.data?.message || "Login Failed"
  //     );
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. Login with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const firebaseUser = userCredential.user;

    // 2. Check email verification
    if (!firebaseUser.emailVerified) {
      alert("Please verify your email before logging in.");
      return;
    }

    await auth.signOut();

    // 3. Get Firebase ID Token
    const idToken = await firebaseUser.getIdToken();

    // 4. Send Firebase token to backend
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/form/firebase-login`,
      {
        idToken,
      }
    );

    console.log("Firebase Login Response:", response.data);

    // 5. Save your existing JWT / user authentication data
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("userName", response.data.user.name);

    // 6. Navigate
    if (location.state?.from === "/cart") {
      navigate("/cart", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

  } catch (error) {
    console.log("Login Error:", error);

    alert(
      error.response?.data?.message ||
      error.code ||
      "Login Failed"
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