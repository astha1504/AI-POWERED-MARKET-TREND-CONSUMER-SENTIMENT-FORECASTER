import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-800 p-6 hidden md:block min-h-screen">
      <h2 className="text-xl font-bold mb-8">
        AI Forecaster
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:text-blue-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/compare"
          className="hover:text-blue-400 transition"
        >
          Compare Products
        </Link>

        <Link
          to="/watchlist"
          className="hover:text-blue-400 transition"
        >
          Watchlist
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;
