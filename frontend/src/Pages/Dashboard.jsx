import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <section className="px-4 py-5">
      {isAuthenticated && <h1>Welcome {user.first_name}!</h1>}
    </section>
  );
};

export default Dashboard;
