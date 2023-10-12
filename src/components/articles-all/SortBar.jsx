import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const SortBar = ({ sortBy, setSortBy, order, setOrder }) => {
  return (
      <Box sx={{ display: "flex", alignItems: "center", m:'1rem' }}>
        <FormControl sx={{ minWidth: "9em" }} size='small'>
          <InputLabel id="sortby-label">Sort</InputLabel>
          <Select
            labelId="sortby-label"
            label="Sort"
            id="sortby"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <MenuItem value="created_at">Date posted</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
            <MenuItem value="comment_count">Comments</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: "9em" }} size='small'>
          <InputLabel id="order-label">Order</InputLabel>

          <Select
            labelId="order-label"
            label="Order"
            id="order"
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <MenuItem value="DESC">Descending</MenuItem>
            <MenuItem value="ASC">Ascending</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            setSortBy("created_at");
            setOrder("DESC");
          }}
        >
          reset
        </Button>
      </Box>
   
  );
};

export default SortBar;
