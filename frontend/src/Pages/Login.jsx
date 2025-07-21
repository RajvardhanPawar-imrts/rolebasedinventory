import React, { useState } from "react";
import axiosInstance from "../Apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
import { setTokens } from "../auth/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("🔄 Logging in...");

    try {
      const response = await axiosInstance.post("login/", {
        email,
        password,
      });

      const { access, refresh } = response.data;

      if (access && refresh) {
        setTokens({ access, refresh });

        const userData = await axiosInstance.get("me/");
        dispatch(setUser(userData.data));
        setStatus("🎉 Login successful!");
        navigate("/dashboard");
      } else {
        setStatus("Login failed. Invalid response.");
      }
    } catch (error) {
      console.error("[Login Error]: ", error);
      setStatus("🚫 Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center py-14 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login 🔐
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
