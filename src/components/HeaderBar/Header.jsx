import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getTopics } from "../../../api";
import MenuItems from "./MenuItems";
import { UserContext } from "../contexts/Contexts";

export default function Header({ setTopic }) {
  const [topics, setTopics] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const { user } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [menuItems, setMenuItems] = useState([
    {
      title: "Topics",
      url: "/",
      submenu: [],
    },
    {
      title: "Profile",
      url: `/user/${user}`,
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
        <Link
          to={`/all`}
          onClick={() => {
            setTopic("");
            setDropdown(false);
          }}
        >
          <img
            className="header-logo"
            src="/src/assets/cb-logo.jpg"
            alt="website logo"
          />
        </Link>
        {menuItems.map((menu, index) => {
          return (
            <MenuItems
              setTopic={setTopic}
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
