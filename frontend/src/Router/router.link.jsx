import Dashboard from "../Pages/Dashboard";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";
import POS from "../Pages/POS";
import Register from "../Pages/Register";
import Reports from "../Pages/Reports";
import Roles from "../Pages/Roles";
import Sales from "../Pages/Sales";
import { all_routes } from "./allroutes";

export const websiteRoutes = [
  {
    id: "1",
    name: "Dashboard",
    link: all_routes.dashboard,
    element: <Dashboard />,
  },
  {
    id: "2",
    name: "Login",
    link: all_routes.login,
    element: <Login />,
  },
  {
    id: "3",
    name: "Register",
    link: all_routes.register,
    element: <Register />,
  },
  {
    id: "4",
    name: "Sales",
    link: all_routes.sales,
    element: <Sales />,
  },
  {
    id: "5",
    name: "Reports",
    link: all_routes.reports,
    element: <Reports />,
  },
  {
    id: "6",
    name: "POS",
    link: all_routes.pos,
    element: <POS />,
  },
  {
    id: "7",
    name: "Homepage",
    link: all_routes.home,
    element: <Homepage />,
  },
  {
    id: "8",
    name: "Roles Page",
    link: all_routes.roles,
    element: <Roles />,
  },
];
