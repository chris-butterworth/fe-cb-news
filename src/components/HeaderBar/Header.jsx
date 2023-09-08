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

  useEffect(() => {
    const handleScroll = (event) => {
      console.log('scroll')
      setDropdown(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      onScroll={(e) => {
        setDropdown(false);
      }}
    >
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
            src="https://pic.onlinewebfonts.com/thumbnails/icons_4116.svg"
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
