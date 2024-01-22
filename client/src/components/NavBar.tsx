import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";

function NavBar() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="navLeft">
          <NavLink to="/">
            <img
              style={{ cursor: "pointer" }}
              className="mainLogo"
              src="https://res.cloudinary.com/dfm1r4ikr/image/upload/v1699830493/voyageApp/logo-variations-01_atukuy.png"
              alt="voyage-logo"
            />
          </NavLink>
        </div>
        <div style={{ cursor: "pointer" }} className="navMiddle">
          <NavLink to="/experiences">experiences</NavLink>
          <span> | </span>
          <NavLink to="/map">map</NavLink>
          <span> | </span>
          <NavLink to="/about">about</NavLink>
        </div>

        <div style={{ cursor: "pointer" }} className="navRight">
          {isLoading ? (
            <span style={{ opacity: "0" }}>profile</span>
          ) : user ? (
            <NavLink to="/profile">profile</NavLink>
          ) : (
            <>
              <NavLink to="/login">login</NavLink>
              <span> | </span>
              <NavLink to="/signup">sign up</NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
