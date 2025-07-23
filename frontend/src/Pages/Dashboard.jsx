import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const pageButtons = [
    {
      id: "1",
      link: "/sales",
      name: "Sales Page",
    },
    {
      id: "2",
      link: "/roles",
      name: "Roles Page",
    },
  ];
  return (
    <section className="px-4 py-5">
      {isAuthenticated && <h1>Welcome {user.first_name}!</h1>}
      <div className="w-full flex items-center justify-around gap-3">
        {pageButtons.map((btn) => (
          <Link to={btn.link} key={btn.id}>
            <button className="px-4 py-1 bg-black text-white">
              {btn.name}
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
