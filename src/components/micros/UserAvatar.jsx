
import {
  libarianNavLinks,
  loggedInNavLinks,
} from "../../utils/constants";

const UserAvatar = ({ user }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span className="text-2xl">
              {user?.email?.slice(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-30"
      >
        {(user?.role === "librarian" || user?.role === "admin" ) &&
          libarianNavLinks.map((navLink) => (
            <li key={navLink.name}>
              <a href={navLink.path} className={navLink.class}>
                {navLink.name}
              </a>
            </li>
          ))}
        {user &&
          loggedInNavLinks.map((navLink) => (
            <li key={navLink.name}>
              <a href={navLink.path} className={navLink.class}>
                {navLink.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserAvatar;
