import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useState } from "react";
import RefresherHandler from "./RefresherHandler";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to={`/`} />;
  };

  return (
    <>
      <Router>
        <div>
          <RefresherHandler setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/signUp"} element={<SignUp />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
