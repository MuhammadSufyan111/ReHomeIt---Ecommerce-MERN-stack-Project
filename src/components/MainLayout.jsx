import React from "react";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
