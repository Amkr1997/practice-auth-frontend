import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Email and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://practice-auth-backend.vercel.app/login",
        {
          email,
          password,
        }
      );

      const { message, success, jwtToken, name: userName } = response.data;

      if (success) {
        toast.success("Login successfully");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loginedUser", userName);

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        toast.warn(message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message);
        console.log(error);
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <>
      <Navbar />

      <section className="container" style={{ marginTop: "4rem" }}>
        <div className="row">
          <div className="col-1 col-lg-3"></div>
          <div className="col-10 col-lg-6 text-center card pt-4 pb-2 px-4 bg-light">
            <h1 className="pt-2 pb-2">Login Here</h1>
            <form onSubmit={handleLogin}>
              <label
                htmlFor="emailInp"
                className="form-label fs-4 fw-medium py-2"
              >
                Email:{" "}
              </label>
              <br />
              <input
                type="email"
                id="emailInp"
                className="py-2 form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label
                htmlFor="passInp"
                className="form-label fs-4 fw-medium py-2"
              >
                Password:{" "}
              </label>
              <br />
              <input
                type="password"
                id="passInp"
                className="py-2 form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="btn btn-danger w-100">Submit</button>
            </form>

            <p className="pt-3">
              New here, <Link to={`/signUp`}>Sign Up</Link>
            </p>
          </div>
          <div className="col-1 col-lg-3"></div>
        </div>
      </section>
    </>
  );
};

export default Login;
