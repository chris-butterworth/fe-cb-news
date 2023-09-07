import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopics } from "../../../api";
import MenuItems from "./MenuItems";

export default function Header({ topic, setTopic }) {
  const [topics, setTopics] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const navigate = useNavigate();
  const redirect = () => {
    if (window.location.pathname !== "/articles") navigate("/articles");
  };
  return (
    <header>
      <ul
        className="menus"
        onMouseLeave={() => {
          setDropdown(false);
        }}
      >
        <Link
          onClick={(e) => {
            e.preventDefault();
            setTopic("");
            redirect();
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
              topic={topic}
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
