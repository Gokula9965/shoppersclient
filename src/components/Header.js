import React from "react";
import Banner from "./Banner";
import Products from "./Products";
import Contact from "./Contact";

const Header = () => {
  return (
    <div>
      <Banner />
      <Products />
      <Contact/>
    </div>
  );
};

export default Header;
