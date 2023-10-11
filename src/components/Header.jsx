import { useEffect, useState, useContext } from "react";
import { getTopics } from "../../api";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  MenuItem,
  Divider,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

export default function Header({ setTopic, topic }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleClick = (e) => {
    setMenuOpen((current) => {
      return !current;
    });
  };

  return (
    <Box sx={{ width: "100%", margin: 0 }}>
      <AppBar position="static">
        <Toolbar sx={{ margin: "0.5em" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            sx={{ mr: 2 }}
            src="https://www.finsmes.com/wp-content/uploads/2020/01/collbox-1.png"
            onClick={() => {
              navigate("/");
              handleClose();
            }}
          />

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {window.location.pathname === "/profile"
              ? "Profile"
              : topic === "all"
              ? "Home"
              : `${topic.slice(0, 1).toUpperCase()}${topic.slice(1)}`}
          </Typography>
          <ProfileDropdown />
        </Toolbar>
      </AppBar>
      {menuOpen && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper  elevation={10}>
            <Divider />
            <MenuItem
              sx={{mt:1}}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                handleClose();
              }}
            >
              Home / All
            </MenuItem>
            <Divider />
            {topics.map((topic) => {
              return (
                <div key={topic.slug}>
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setTopic(topic.slug);
                      handleClose();
                      navigate(`topic/${topic.slug}`);
                    }}
                  >
                    {`${topic.slug.slice(0, 1).toUpperCase()}${topic.slug.slice(
                      1
                    )}`}
                  </MenuItem>
                  <Divider />
                </div>
              );
            })}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
