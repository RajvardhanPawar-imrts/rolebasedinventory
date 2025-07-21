import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../Redux/userSlice";
import { getToken } from "../auth/auth";
import axiosInstance from "../Apis/axiosInstance";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const rehydrateUser = async () => {
      const token = getToken();
      if (!token) return;
      try {
        const res = await axiosInstance.get("me/");
        dispatch(setUser(res.data));
      } catch (err) {
        console.error("Token expired or invalid", err);
        dispatch(clearUser());
      }
    };

    rehydrateUser();
  }, [dispatch]);

  return children;
};

export default AuthLoader;
