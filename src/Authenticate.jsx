import React, { useState, createContext, useContext, useEffect } from "react";
import showToast from "./components/Notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    try {
      const base_url = import.meta.env.VITE_API_BASE_URL;
      const email = import.meta.env.VITE_API_EMAIL;
      const password = import.meta.env.VITE_API_PASSWORD;
      const response = await axios.post(base_url + "api/login", {
        email,
        password,
      });
      return response.data.token === token;
    } catch (error) {
      console.error("Token verification failed", error);
      return false;
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem("authToken");
      const storedTokenExpiry = localStorage.getItem("authTokenExpiry");

      if (storedToken && storedTokenExpiry) {
        const expiryTime = parseInt(storedTokenExpiry, 10);
        if (Date.now() < expiryTime) {
          const isValidToken = await verifyToken(storedToken);

          if (isValidToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setTokenExpiry(expiryTime);
            if (location.pathname === "/signin") {
              navigate("/");
            }
          } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenExpiry");
            setIsAuthenticated(false);
            showToast("Session expired. Please log in again.", {
              type: "error",
            });
            navigate("/signin");
          }
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authTokenExpiry");
          navigate("/signin");
        }
      } else {
        navigate("/signin");
      }
      setLoading(false);
    };

    checkTokenValidity();
  }, [navigate, location.pathname]);

  const login = async (email, password) => {
    try {
      const base_url = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${base_url}api/login`, {
        email,
        password,
      });

      const tokenExpiryTime = Date.now() + 60 * 60 * 1000;
      const authToken = response.data.token;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("authTokenExpiry", tokenExpiryTime.toString());

      setToken(authToken);
      setTokenExpiry(tokenExpiryTime);
      setIsAuthenticated(true);
      showToast("Login successful", { type: "success" });
      navigate("/");
    } catch (error) {
      console.error(error);
      showToast("Login failed, invalid credentials", {
        type: "error",
      });
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);
    showToast("Logged out successfully", { type: "info" });
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };
