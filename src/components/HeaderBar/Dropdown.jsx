import { Link } from "react-router-dom";

export default function Dropdown({
  submenu,
  dropdown,
  setDropdown,
  setTopic,
}) {


  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenu.map((item, index) => {
        return (
          <li key={index}>
            <Link
              role="button"
              to={`${item.slug}`}
              onClick={() => {
                setDropdown(false);
                setTopic(item.slug);
              }}
            >
              <button
                className="dropdown-menu-items"
              >
                {" "}
                {item.slug}
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
