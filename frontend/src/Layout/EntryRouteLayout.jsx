import React from "react";
import EntryRouteHeader from "../Components/EntryRouteHeader";
import { Outlet } from "react-router-dom";

const EntryRouteLayout = () => {
  return (
    <>
      <EntryRouteHeader />
      <Outlet />
    </>
  );
};

export default EntryRouteLayout;
