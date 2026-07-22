import { useLocation } from "react-router-dom";
// import TopBar from "./TopBar";
// import Header from "./Header";
// import Navbar from "./Navbar";
import ProductListing from "./ProductListing";
import { useEffect, useState } from "react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
//location redirect page
const location = useLocation();

// useEffect(() => {
//   if (location.state?.category) {
//     setSelectedCategory(location.state?.category || "");
//   }

//   if (location.state?.search) {
//     setSearchKeyword(location.state?.search || "");
//   }
// }, [location]);

useEffect(() => {
  setSelectedCategory(location.state?.category || "");
  setSearchKeyword(location.state?.search || "");
}, [location]);

  return (
    <>
      {/* <TopBar />
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
        setSearchKeyword={setSearchKeyword}
      />
      <Navbar /> */}
      <ProductListing selectedCategory={selectedCategory} 
      searchKeyword={searchKeyword}
      page={page}
      setPage={setPage}/>
    </>
  );
};

export default Shop;