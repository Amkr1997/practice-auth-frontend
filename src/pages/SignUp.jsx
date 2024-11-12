import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      formData.userName === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.warn("Please fill complete data");
      return;
    }

    try {
      const result = await axios.post(
        `https://practice-auth-backend.vercel.app/signup`,
        formData
      );
      const { success, message } = result.data;

      if (success) {
        toast.success("Signed up successfully");

        setFormData({
          userName: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.warn(message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message);
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="text-center w-25 mx-auto card pt-4 pb-2 px-4 bg-light"
        style={{ marginTop: "4rem" }}
      >
        <h1 className="pt-2 pb-2">Signup Here</h1>
        <form onSubmit={handleSignUp}>
          <label htmlFor="nameInp" className="form-label fs-4 fw-medium py-2">
            Username:{" "}
          </label>
          <br />
          <input
            type="text"
            id="nameInp"
            className="py-2 form-control"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="emailInp" className="form-label fs-4 fw-medium py-2">
            Email:{" "}
          </label>
          <br />
          <input
            type="email"
            id="emailInp"
            className="py-2 form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="passInp" className="form-label fs-4 fw-medium py-2">
            Password:{" "}
          </label>
          <br />
          <input
            type="password"
            id="passInp"
            className="py-2 form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-danger w-100">Submit</button>
        </form>

        <p className="pt-3">
          Already a member, <Link to={`/`}>Login</Link>
        </p>
      </section>
    </>
  );
};

export default SignUp;
