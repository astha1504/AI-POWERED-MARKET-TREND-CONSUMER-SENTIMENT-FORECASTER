import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";


import Compare from "../pages/Compare";
import Watchlist from "../pages/Watchlist";



const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:productName"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/compare"
        element={
        <ProtectedRoute>
            <Compare />
        </ProtectedRoute>
        }
     />
       <Route
        path="/watchlist"
        element={
        <ProtectedRoute>
           <Watchlist />
        </ProtectedRoute>
       }
    />



      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
