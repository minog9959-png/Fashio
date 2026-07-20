import Header from "./Header";
import Navbar from "./Navbar";
import ProductListing from "./ProductListing";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  return (
    <>
      <TopBar />
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
        setSearchKeyword={setSearchKeyword}
      />
      <Navbar />
      <ProductListing selectedCategory={selectedCategory} 
      searchKeyword={searchKeyword}
      page={page}
      setPage={setPage}/>
    </>
  );
};

export default Shop;