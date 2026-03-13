import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-slate-800 p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Welcome, {user?.email}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
