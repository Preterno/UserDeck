import React from "react";
import { useAuth } from "../Authenticate";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
  return (
    <div className="flex w-full py-2 bg-white shadow-grey shadow-2xl px-10 text-center items-center justify-between max-sm:px-3">
      <i
        class="bi bi-cloud-haze2-fill h-10 text-3xl cursor-pointer"
        onClick={handleClick}
      ></i>
      {isAuthenticated && (
        <div
          className="bg-black text-grey px-6 py-2 rounded-3xl text-base tracking-wider cursor-pointer hover:bg-slate-950 transition-all ease-in-out duration-200"
          onClick={handleLogout}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
