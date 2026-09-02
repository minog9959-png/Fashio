import { Routes, Route } from "react-router-dom";

import BenefitSection from "./components/BenefitSection";
import Categories from "./components/Categories";
// import DealWeek from "./components/DealWeek";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InstagramSection from "./components/InstagramSection";
// import LatestBlog from "./components/LatestBlog";
import MenCollection from "./components/MenCollection";
import Navbar from "./components/Navbar";
import PartnerSection from "./components/PartnerSection";
import TopBar from "./components/TopBar";
import WomenCollection from "./components/WomenCollection";

import Login from "./components/Login";
import Signup from "./components/Signup";

import { useEffect } from "react";
import Swal from "sweetalert2";
import ProtectedRoute from "./components/ProtectedRoute";
import Shop from "./components/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import Layout from "./pages/Layout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminOrders from "./pages/AdminOrders";
import Contact from "./pages/Contact";

import socket from "./socketConnection";

// permission request in App
import {
  requestNotificationPermission,
  listenForMessages,
} from "./firebaseMessaging";
import AdminNewsletter from "./pages/AdminNewsletter";
import Profile from "./pages/Profile";

//import women collection 
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// redirect to smooth on women collection section
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

function Home() {

  return (
    <>
      <Hero />
      <Categories />
      <WomenCollection />
      {/* <DealWeek /> */}
      <MenCollection />
      <InstagramSection />
      {/* <LatestBlog /> */}
      <BenefitSection />
      <PartnerSection />
      {/* <Footer /> */}
    </>
  );
}

function App() {

  //updated
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


  // permission request in App
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    listenForMessages();
  }, []);

  return (
    <>

    <ScrollToHash />

      <Routes>

        <Route element={<Layout />} >

          {/* Pages with Header + footer */}

          <Route path="/" element={<Home />} />

          <Route path="/shop" element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          } />

          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
          />

          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
          />

          <Route path="/order" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>}
          />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />

        </Route>

        {/* Pages without Header + footer */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* Admin Routes */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
        </Route>

        {/* Registered Users in a dashboard */}
        <Route path="admin/users" element={
          <AdminProtectedRoute>
            <AdminUsers />
          </AdminProtectedRoute>} />

        {/* Admin Products in a dashboard */}
        <Route path="admin/products" element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        } />

        {/* Admin categories in a dashboard */}
        <Route path="admin/categories" element={
          <AdminProtectedRoute>
            <AdminCategories />
          </AdminProtectedRoute>
        } />

        {/* Admin order in a dashboard */}
        <Route path="admin/orders" element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>} />

        {/* Admin order in a dashboard */}
        <Route path="admin/newsletter" element={
          <AdminProtectedRoute>
            <AdminNewsletter />
          </AdminProtectedRoute>
        } />

        {/* user Profile */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

      </Routes>

    </>
  );
}

export default App;