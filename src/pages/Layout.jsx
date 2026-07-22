import { Outlet } from "react-router-dom";

import TopBar from "../components/TopBar.jsx";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useState } from "react";

const Layout = () => {
    
const [search, setSearch] = useState("");

    return (
        <>
            <TopBar />
            <Header
                search={search}
                setSearch={setSearch}
            />
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

export default Layout;