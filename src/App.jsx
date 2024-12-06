import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import { AuthProvider } from "./Authenticate";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="roboto-regular flex flex-col h-screen">
          <Header />
          <div className="flex-grow bg-grey">
            <Routes>
              {/* Public Route */}
              <Route path="/signin" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit/:id" element={<EditPage />} />
              </Route>
              {/* Wildcard route */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
