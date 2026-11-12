import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/form/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAuthorized(true);
      } catch (error) {
        localStorage.removeItem("token");
        setAuthorized(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return authorized ? (
  children
) : (
  <Navigate
    to="/login"
    state={{ from: location.pathname }}
    replace
  />
);
};

export default ProtectedRoute;