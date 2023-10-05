import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getTopics } from "../../api";
import { Context } from "./contexts/Contexts";
import {
  Accordion,
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ setTopic, topic }) {
  const [topics, setTopics] = useState([]);
  const { setUser } = useContext(Context);
  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
    });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ margin: "1em" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {topic === "all" && "CB News"}
            {topic !== "all" && `cb / ${topic}`}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setUser("");
              localStorage.setItem("user", '');
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// return (
// 	<header>
// 		<Link
// 			to={`/topic/all`}
// 			onClick={() => {
// 				setTopic('')
// 			}}
// 		>
// 			<Badge
// 				className="header-logo"
// 				src="https://pic.onlinewebfonts.com/thumbnails/icons_4116.svg"
// 				alt="website logo"
// 			/>
// 		</Link>
// 		<Accordion>
// 			<ul>
// 				<li>
// 					<Link
// 						to={`/topic/all`}
// 						onClick={() => {
// 							setTopic('')
// 						}}
// 					>
// 						Home
// 					</Link>
// 				</li>
// 				<li>
// 					<a>Topics</a>
// 					<ul>
// 						{topics.map((item, index) => {
// 							return (
// 								<li key={index}>
// 									<Link
// 										role="button"
// 										to={`/topic/${item.slug}`}
// 										onClick={() => {
// 											setTopic(item.slug)
// 										}}
// 									>
// 										{item.slug}
// 									</Link>
// 								</li>
// 							)
// 						})}
// 					</ul>
// 				</li>
// 				<li>
// 					<Link to={`/profile`}>Profile</Link>
// 				</li>
// 				<li>
// 					<Link
// 						onClick={() => {
// 							setUser('')
// 							localStorage.setItem('user', '')
// 						}}
// 					>
// 						Logout
// 					</Link>
// 				</li>
// 			</ul>
// 		</Accordion>
// 	</header>
// )
