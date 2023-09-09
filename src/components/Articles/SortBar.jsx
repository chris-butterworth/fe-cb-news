import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SortBar = ({ topic, sortBy, setSortBy, order, setOrder }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((searchParams) => {
      sortBy === "created_at" || sortBy === ""
        ? searchParams.delete("sort_by")
        : searchParams.set("sort_by", sortBy);
      return searchParams;
    });
  }, [sortBy]);

  useEffect(() => {
    setSearchParams((searchParams) => {
      order === "DESC" || order === ""
        ? searchParams.delete("order")
        : searchParams.set("order", order);
      return searchParams;
    });
  }, [order]);

  return (
    <div className="sort-bar">
      <h3>
        {!topic && "all topics"}
        {topic && `cb / ${topic}`}
      </h3>
      <label htmlFor="sortby">Sort by - </label>
      <select
        id="sortby"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
      >
        <option value="created_at">Date posted</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select> 
      <select
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      >
        <option value="DESC">descending</option>
        <option value="ASC">ascending</option>
      </select>
      <button
        onClick={() => {
          setSortBy("created_at");
          setOrder("DESC");
        }}
      >
        reset
      </button>
    </div>
  );
};

export default SortBar;
