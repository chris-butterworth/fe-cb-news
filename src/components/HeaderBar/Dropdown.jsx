import { Link } from "react-router-dom";

export default function Dropdown({ submenu, dropdown, setDropdown }) {
  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenu.map((item, index) => {
        return (
          <li key={index}>
            <Link
              role="button"
              to={`/articles?topic=${item.slug}`}
              onClick={() => {
                setDropdown(false);
              }}
            >
              <button className="dropdown-menu-items"> {item.slug}</button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
