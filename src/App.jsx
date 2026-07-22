import { Routes, Route } from "react-router-dom";

import BenefitSection from "./components/BenefitSection";
import Categories from "./components/Categories";
import DealWeek from "./components/DealWeek";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InstagramSection from "./components/InstagramSection";
import LatestBlog from "./components/LatestBlog";
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

function Home() {
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.state?.success) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Welcome Back!",
  //       text: "You are an authorized user. Now you can shop anything from our store.",
  //       confirmButtonText: "Start Shopping",
  //       confirmButtonColor: "#D89D32", // Orange
  //     });
  //   }
  // }, [location]);

//   const location = useLocation();
//   const navigate = useNavigate();

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (location.state?.success && token) {
//     Swal.fire({
//       title: "Welcome Back!",
//       text: "You are an authorized user. Now you can shop anything from our store.",
//       icon: "warning",
//     });

//     navigate("/",
//        { replace: true,
//         state: {} 
//       });
//   }
// }, [location, navigate]);

  return (
    <>
      <Hero />
      <Categories />
      <WomenCollection />
      <DealWeek />
      <MenCollection />
      <InstagramSection />
      <LatestBlog />
      <BenefitSection />
      <PartnerSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
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

      </Route>

      {/* Pages without Header + footer */}
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;