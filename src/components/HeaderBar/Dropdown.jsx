import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Dropdown({
  submenu,
  dropdown,
  setDropdown,
  topic,
  setTopic,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  const navigate = useNavigate();
  const redirect = () => {
    if (path !== "/articles") navigate("/articles");
  };

  useEffect(() => {
    const params = {};
    const sortby = searchParams.get("sort_by");
    const order = searchParams.get("order");
    if (topic) params.topic = topic;
    params.sort_by = sortby;
    params.order = order;
    setSearchParams(params);
  }, [topic, path === "/articles"]);

  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenu.map((item, index) => {
        return (
          <li key={index}>
            {/* <Link
              role="button"
              to={`/articles?topic=${item.slug}`}
              onClick={() => {
                setDropdown(false);
              }}
            > */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setTopic(item.slug);
                redirect();
                setDropdown(false);
              }}
              className="dropdown-menu-items"
            >
              {" "}
              {item.slug}
            </button>
            {/* </Link> */}
          </li>
        );
      })}
    </ul>
  );
}
