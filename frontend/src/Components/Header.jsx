import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-6 px-4 bg-blue-500">
      <Link to={"/"}>
        <button className="bg-red-500 px-4 py-1">Home</button>
      </Link>
    </header>
  );
};

export default Header;
