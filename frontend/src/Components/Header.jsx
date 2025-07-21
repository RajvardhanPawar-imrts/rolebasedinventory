import React from "react";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "../auth/auth"; // ✅ remove access + refresh
import { useDispatch } from "react-redux";
import { clearUser } from "../Redux/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    removeTokens(); // ✅ remove both tokens
    dispatch(clearUser()); // ✅ clear Redux user
    navigate("/login"); // ✅ redirect
  };

  return (
    <header className="py-3 px-4 bg-black flex justify-between items-center w-full">
           {" "}
      <button className="bg-white text-black rounded-lg px-4 text-sm py-2">
                Home      {" "}
      </button>
           {" "}
      <button
        className="bg-white text-black rounded-lg px-4 text-sm py-2"
        onClick={logoutUser}
      >
                Logout      {" "}
      </button>
         {" "}
    </header>
  );
};

export default Header;
