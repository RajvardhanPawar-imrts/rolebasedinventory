import Dashboard from "../Pages/Dashboard";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Roles from "../Pages/Roles";
import Sales from "../Pages/Sales";
import { all_routes } from "./allroutes";

export const websiteRoutes = [
  {
    id: "1",
    name: "Sales",
    link: all_routes.sales,
    element: <Sales />,
  },

  {
    id: "2",
    name: "Roles Page",
    link: all_routes.roles,
    element: <Roles />,
  },
];

export const entryRoutes = [
  {
    id: "1",
    name: "Register",
    link: all_routes.register,
    element: <Register />,
  },
  {
    id: "2",
    name: "Login",
    link: all_routes.login,
    element: <Login />,
  },
];

export const dashboardRoute = [
  {
    id: "1",
    name: "Dashboard",
    link: all_routes.dashboard,
    element: <Dashboard />,
  },
];
