import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  websiteRoutes,
  entryRoutes,
  dashboardRoute,
  unauthmodules,
} from "./router.link";
import SiteLayout from "../Layout/SiteLayout";
import EntryRouteLayout from "../Layout/EntryRouteLayout";
import ProtectedRoute from "./ProtectedRoute";
import ModuleAccess from "./ModuleAccess";
import Undefined from "../Notfound/undefined";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* All Routes with authorization and role based access */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SiteLayout />}>
            {websiteRoutes.map((item) => (
              <Route
                key={item.id}
                path={item.link}
                element={
                  <ModuleAccess module={item.module}>
                    {item.element}
                  </ModuleAccess>
                }
              />
            ))}
          </Route>
        </Route>
        {/* Login and register routes */}
        <Route element={<EntryRouteLayout />}>
          {entryRoutes.map((item) => (
            <Route element={item.element} key={item.id} path={item.link} />
          ))}
        </Route>
        {/* Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SiteLayout />}>
            {dashboardRoute.map((item) => (
              <Route element={item.element} key={item.id} path={item.link} />
            ))}
          </Route>
        </Route>
        {/* unauthorization Route */}
        {unauthmodules.map((item) => (
          <Route element={item.element} key={item.id} path={item.link} />
        ))}
        {/* Undefined Route */}
        <Route path="*" element={<Undefined />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
