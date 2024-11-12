import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefresherHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (location.pathname === "/" || location.pathname === "/signUp") {
        navigate("/profile", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
};

export default RefresherHandler;
