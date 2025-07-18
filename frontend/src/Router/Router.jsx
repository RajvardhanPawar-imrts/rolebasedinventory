import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { websiteRoutes } from "./router.link";
import SiteLayout from "../Layout/SiteLayout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<SiteLayout />}>
          {websiteRoutes.map((item) => (
            <Route element={item.element} id={item.id} path={item.link} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
