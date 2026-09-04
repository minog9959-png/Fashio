import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import BenefitSection from "./components/BenefitSection";
import Categories from "./components/Categories";
import Hero from "./components/Hero";
import InstagramSection from "./components/InstagramSection";
import MenCollection from "./components/MenCollection";
import PartnerSection from "./components/PartnerSection";
import WomenCollection from "./components/WomenCollection";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";

import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

import socket from "./socketConnection";

import {
listenForMessages,
} from "./firebaseMessaging";

// ================= LAZY LOADED PAGES =================

// Auth
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

// Public Pages
const Shop = lazy(() => import("./components/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Contact = lazy(() => import("./pages/Contact"));

// User Pages
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Profile = lazy(() => import("./pages/Profile"));

// Payment Pages
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const AdminCategories = lazy(() => import("./pages/AdminCategories"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminNewsletter = lazy(() => import("./pages/AdminNewsletter"));

// ================= SCROLL TO HASH =================

const ScrollToHash = () => {
const location = useLocation();

useEffect(() => {
if (location.hash) {
const element = document.getElementById(
location.hash.replace("#", "")
);

  if (element) {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }
}

}, [location]);

return null;
};

// ================= HOME PAGE =================

function Home() {
return (
<> <Hero /> <Categories /> <WomenCollection /> <MenCollection /> <InstagramSection /> <BenefitSection /> <PartnerSection />
</>
);
}

// ================= APP =================

function App() {

// Socket Connection
useEffect(() => {
const userId = localStorage.getItem("userId");

socket.on("connect", () => {
  console.log("Connected to Socket.IO:", socket.id);

  if (userId) {
    socket.emit("joinUserRoom", userId);
    console.log("Joined user room:", userId);
  }
});

socket.on("newOrder", (data) => {
  console.log("New Order Received:", data);
});

return () => {
  socket.off("connect");
  socket.off("newOrder");
};

}, []);

// Firebase Notification Permission
// useEffect(() => {
// requestNotificationPermission();
// }, []);

// Firebase Foreground Messages
useEffect(() => {
listenForMessages();
}, []);

return (
<> <ScrollToHash />

  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    }
  >
    <Routes>

      {/* ================= MAIN WEBSITE ================= */}

      <Route element={<Layout />}>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

      </Route>


      {/* ================= AUTH PAGES ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/payment-success"
        element={<PaymentSuccess />}
      />

      <Route
        path="/payment-failed"
        element={<PaymentFailed />}
      />


      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />

        <Route
          path="products"
          element={<AdminProducts />}
        />

        <Route
          path="categories"
          element={<AdminCategories />}
        />

        <Route
          path="orders"
          element={<AdminOrders />}
        />

        <Route
          path="newsletter"
          element={<AdminNewsletter />}
        />

      </Route>


      {/* ================= PROFILE ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  </Suspense>
</>

);
}

export default App;
