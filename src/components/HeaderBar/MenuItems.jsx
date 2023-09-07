import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

export default function MenuItems({
  title,
  url,
  submenu,
  dropdown,
  setDropdown,
  topic,
  setTopic,
}) {
  return (
    <li className="menu-item-flex">
      {submenu ? (
        <>
          <button
            className="menu-items"
            type="button"
            aria-haspopup="menu"
            url={url}
            onClick={(e) => {
              dropdown ? setDropdown(false) : setDropdown(true);
            }}
          >
            {title}{" "}
          </button>
          <Dropdown
            topic={topic}
            setTopic={setTopic}
            submenu={submenu}
            dropdown={dropdown}
            setDropdown={setDropdown}
          />
        </>
      ) : (
        <Link role="button" to={url}>
          <button className="menu-items">{title}</button>
        </Link>
      )}
    </li>
  );
}