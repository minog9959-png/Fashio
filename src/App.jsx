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

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import ProtectedRoute from "./components/ProtectedRoute";
import Shop from "./components/Shop";
import ProductDetails from "./pages/ProductDetails";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You are an authorized user. Now you can shop anything from our store.",
        confirmButtonText: "Start Shopping",
        confirmButtonColor: "#D89D32", // Orange
      });
    }
  }, [location]);

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
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
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/shop" element={<Shop />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      {/* <Route
        path="/womenCollection"
        element={<WomenCollection />}
      /> */}

    </Routes>
  );
}

export default App;