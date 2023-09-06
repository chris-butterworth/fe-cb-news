import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopics } from "../../../api";
import MenuItems from "./MenuItems";

export default function Header() {
  const [topics, setTopics] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      title: "Topics",
      url: "/",
      submenu: [],
    },
    {
      title: "Profile",
      url: "/user",
    },
    {
      title: "About",
      url: "/about",
    },
  ]);

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  useEffect(() => {
    setMenuItems((currMenuItems) => {
      currMenuItems.forEach((item) => {
        if (item.title === "Topics") item.submenu = topics;
      });
      return currMenuItems;
    });
  }, [topics]);

  return (
    <header>
      <ul
        className="menus"
        onMouseLeave={() => {
          setDropdown(false);
        }}
      >
        <Link to="/articles">
          <img
            className="header-logo"
            src="/src/assets/cb-logo.jpg"
            alt="website logo"
          />
        </Link>
        {menuItems.map((menu, index) => {
          return (
            <MenuItems
              dropdown={dropdown}
              setDropdown={setDropdown}
              title={menu.title}
              url={menu.url}
              submenu={menu.submenu}
              key={index}
            />
          );
        })}
      </ul>
    </header>
  );
}
