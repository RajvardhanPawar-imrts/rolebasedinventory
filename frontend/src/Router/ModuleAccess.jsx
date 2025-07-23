import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axiosInstance from "../Apis/axiosInstance";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";

const ModuleAccess = ({ module, children }) => {
  const roleid = useSelector((state) => state.user.user?.role_id);
  const cacheRef = useRef(null);

  const [permissions, setPermissions] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  // Fetch permissions based on role id
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`user-permission/${roleid}/`);
      cacheRef.current = response.data.modules;
      setPermissions(response.data.modules);
    } catch (error) {
      console.error("Failed to fetch role modules", error);
      cacheRef.current = [];
      setPermissions([]);
    }
  };

  useEffect(() => {
    if (!roleid) return;

    if (cacheRef.current) {
      setPermissions(cacheRef.current);
    } else {
      fetchUserData();
    }

    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(loaderTimer); // cleanup
  }, [roleid]);

  if (permissions === null || showLoader) {
    return <Loader />;
  }

  if (permissions.includes("all") || permissions.includes(module)) {
    return children;
  }

  // ❌ Not allowed
  return <Navigate to="/unauthorized" replace />;
};

export default ModuleAccess;
