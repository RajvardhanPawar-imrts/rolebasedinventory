import React from "react";
import { Link } from "react-router-dom";

const UnthorizedModule = () => {
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center w-full">
      <div className="max-w-lg text-center">
        <p className="text-base">
          You do not have premission to access this module
        </p>
        <Link to={"/dashboard"}>
          <button className="bg-black text-white px-4 py-1 my-3">Home</button>
        </Link>
      </div>
    </section>
  );
};

export default UnthorizedModule;
