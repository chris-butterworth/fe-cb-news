// import './App.css'
import Contents from "./components/Contents";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Login from "./components/user/Login";
import { useContext } from "react";
import { Context } from "./components/contexts/Contexts";
import { Box, Container, Grid, Paper } from "@mui/material";
import ScrollIntoView from "./components/ScollIntoView";

function App() {
  const [topic, setTopic] = useState("all");
  const { user } = useContext(Context);

  return (
    <Grid container>
      <Box
        id="back-to-top-anchor"
        sx={{ width: "100%", maxWidth: "960px", margin: "auto" }}
      >
        {user.username ? (
          <Box>
            <Header topic={topic} setTopic={setTopic} />
            <Contents topic={topic} setTopic={setTopic} />
          </Box>
        ) : (
          <Login />
        )}
        <ScrollIntoView />
      </Box>
    </Grid>
  );
}

export default App;
