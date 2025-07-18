import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../Router/allroutes";

const Homepage = () => {
  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        Welcome to the Homepage
      </h1>
      <div className="flex flex-col gap-2 w-56">
        <Link
          to={all_routes.dashboard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Dashboard
        </Link>
        <Link
          to={all_routes.login}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center"
        >
          Login
        </Link>
        <Link
          to={all_routes.register}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-center"
        >
          Register
        </Link>
        <Link
          to={all_routes.sales}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-center"
        >
          Sales
        </Link>
        <Link
          to={all_routes.reports}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 text-center"
        >
          Reports
        </Link>
        <Link
          to={all_routes.pos}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-center"
        >
          POS
        </Link>
        <Link
          to={all_routes.roles}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-center"
        >
          Create Roles
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
