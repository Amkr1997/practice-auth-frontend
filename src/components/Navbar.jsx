import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-light py-2">
      <nav className="container">
        <ul className="m-0 nav justify-content-center">
          <li className="nav-item fs-5 fw-medium text-uppercase">
            <NavLink to="/" className={"nav-link text-dark"}>
              Login
            </NavLink>
          </li>
          <li className="nav-item fs-5 fw-medium text-uppercase">
            <NavLink to="/signUp" className={`nav-link text-dark`}>
              SignUp
            </NavLink>
          </li>
          {/*<li className="nav-item fs-5 fw-medium text-uppercase">
            <NavLink to="/profile" className={"nav-link text-dark"}>
              Profile
            </NavLink>
          </li>*/}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
