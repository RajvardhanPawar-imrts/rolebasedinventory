import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { websiteRoutes, entryRoutes, dashboardRoute } from "./router.link";
import SiteLayout from "../Layout/SiteLayout";
import EntryRouteLayout from "../Layout/EntryRouteLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<SiteLayout />}>
            {websiteRoutes.map((item) => (
              <Route element={item.element} key={item.id} path={item.link} />
            ))}
          </Route>
        </Route>
        <Route element={<EntryRouteLayout />}>
          {entryRoutes.map((item) => (
            <Route element={item.element} key={item.id} path={item.link} />
          ))}
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<SiteLayout />}>
            {dashboardRoute.map((item) => (
              <Route element={item.element} key={item.id} path={item.link} />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
