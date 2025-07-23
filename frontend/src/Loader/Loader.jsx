import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <section className="absolute top-0 h-screen w-screen flex justify-center bg-white items-center">
      <FadeLoader
        color="black"
        size={90}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  );
};

export default Loader;
