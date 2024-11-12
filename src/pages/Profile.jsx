import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState("");
  const user = localStorage.getItem("loginedUser");
  const navigate = useNavigate();

  const fetchProfiledata = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `https://practice-auth-backend.vercel.app/profile`,
        {
          headers,
        }
      );

      setData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginedUser");
    localStorage.removeItem("token");
    toast.success("Logout successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    fetchProfiledata();
  }, []);

  return (
    <>
      <Navbar />
      {data ? (
        <section className="container">
          <div className="row">
            <div className="col-1 col-lg-3"></div>
            <div className="col-10 col-lg-6 text-center mt-4">
              <h1>Profile Page</h1>
              <p className="fs-4 py-2">
                {data}{" "}
                <span className="text-danger fw-semibold">
                  {user.charAt(0).toUpperCase() + user.slice(1)}
                </span>
              </p>

              <div className="mt-4">
                <div className="card">
                  <div className="card-body">
                    <BsPersonCircle
                      style={{ fontSize: "10rem" }}
                      className="px-3"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-outline-danger rounded-pill mt-4 w-100"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="col-1 col-lg-3"></div>
          </div>
        </section>
      ) : (
        <h1 className="display-4 text-center mt-5 fw-medium">LOADING..</h1>
      )}
    </>
  );
};

export default Profile;
