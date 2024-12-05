import React from "react";

function Header({ isHomePage = true, logout }) {
  const handleClick = () => {
    console.log("Hello");
  };
  const handleLogout = () => {
    logout();
    console.log("Hi");
  };
  return (
    <div className="flex w-full py-2 bg-white shadow-grey shadow-2xl px-10 text-center items-center justify-between max-sm:px-3">
      <i
        class="bi bi-file-ruled-fill h-10 text-3xl cursor-pointer"
        onClick={handleClick}
      ></i>
      {isHomePage && (
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
