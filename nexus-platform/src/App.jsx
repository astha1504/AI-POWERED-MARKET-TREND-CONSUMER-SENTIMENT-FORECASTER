import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

import Cursor from "./components/layout/Cursor";
import Navbar from "./components/layout/Navbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [page, setPage] = useState("landing");

  const { user, login, register, logout, getDisplayName, getInitials } = useAuth();

  const onNav = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Cursor />
      <Navbar page={page} onNav={onNav} user={user} onLogout={logout} />

      {page === "landing" && <LandingPage onNav={onNav} />}

      {page === "login" && (
        <LoginPage onNav={onNav} onLogin={login} />
      )}

      {page === "signup" && (
        <SignupPage onNav={onNav} onRegister={register} />
      )}

      {page === "dashboard" && user && (
        <DashboardPage
          onNav={onNav}
          user={user}
          getDisplayName={getDisplayName}
          getInitials={getInitials}
        />
      )}
    </>
  );
}