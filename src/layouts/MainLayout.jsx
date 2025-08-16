import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "../utils/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <header>
        <nav className="py-10">
          <Navbar />
        </nav>
      </header>

      <div className="container">
        <main className="pt-10">
          <Outlet></Outlet>
        </main>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default MainLayout;
