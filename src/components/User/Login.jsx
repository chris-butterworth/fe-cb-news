import { useContext, useEffect, useState } from "react";
import { getUsers } from "../../../api";
import { Context } from "../contexts/Contexts";
import {
  Box,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItemButton,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";

export default function Login() {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(Context);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h1" fontWeight={"bold"}>
        C B - N E W S
      </Typography>
      <Divider />
      <Typography variant="h2" marginTop={"1rem"}>
        Single Page news forum application
      </Typography>
      <Typography variant="h4">App built with React and MaterialUI.</Typography>
      <Typography variant="h4">Data API built using ExpressJS.</Typography>
      <Typography variant="h5">Created by Chris Butterworth.</Typography>
      <ImageList sx={{ maxWidth: "700px" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Please select a user</ListSubheader>
        </ImageListItem>

        {users.map((user) => {
          return (
            <ImageListItem key={user.username}>
              <ListItemButton
                sx={{ maxHeight: { xs: "10rem", sm: "15rem" } }}
                onClick={(e) => {
                  e.preventDefault()
                  setUser(user);
                  localStorage.setItem("user", user);
                }}
                to="/topics/all"
              >
                <img
                  srcSet={user.avatar_url}
                  alt={user.username}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    margin: "auto",
                  }}
                  loading="lazy"
                />
                <ImageListItemBar title={user.name} subtitle={user.username} />
              </ListItemButton>
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
