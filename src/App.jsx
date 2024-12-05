import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
// import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
// import EditPage from "./pages/EditPage";

function App() {
  return (
    <div className="roboto-regular flex flex-col h-screen">
      <Header />
      <div className="flex-grow bg-grey">
        {/* <LoginPage /> */}
        <HomePage />
        {/* <EditPage /> */}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
