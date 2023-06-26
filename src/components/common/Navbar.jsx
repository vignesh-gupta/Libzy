import {
  faBarsStaggered,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { navLinks } from "../../utils/constants";
import { UserContext } from "../../App";
import UserAvatar from "../micros/UserAvatar";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar bg-white md:px-16 sx:px-10 border-b-2 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Dropdown menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden sm:mr-5 mr-1">
            <FontAwesomeIcon
              icon={faBarsStaggered}
              style={{ color: "#66cc8a" }}
            />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks.map((navLink) => (
              <li key={navLink.name}>
                <a href={navLink.path}>{navLink.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <a href="/" className="uppercase font-bold font-mono text-xl">
          <FontAwesomeIcon
            icon={faBookOpenReader}
            size="xl"
            style={{ color: "#66cc8a" }}
          />{" "}
          <span className="sm:text-2xl text-lg ">Libzy</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((navLink) => (
            <li key={navLink.name}>
              <a href={navLink.path} className={navLink.class}>
                {navLink.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <UserAvatar user={user} />
        ) : (
          <a href="/get-started" className="btn btn-secondary">
            Get Started
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
