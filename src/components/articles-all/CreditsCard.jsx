import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { timeSince } from "../../../utils";
import { portfolio } from "../../Portfolio";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";

export default function CreditsCard() {
  const [bodyPreview, setBodyPreview] = useState(true);
  const navigate = useNavigate();

  const bodyShortner = (body) => {
    if (body.length < 200) {
      return body;
    } else {
      return <>{body.slice(0, 200)}...</>;
    }
  };

  return (
    <Card
      sx={{
        boxShadow: 3,
        m: 2,
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate(`/credit`);
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe">
              {portfolio.author.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          title={portfolio.author}
          subheader={timeSince(portfolio.created_at)}
        />
        <CardContent
          sx={{
            p: 1,
            pt: 0,
            pb: 0,
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "inherit" },
            justifyContent: "space-between",
          }}
        >
          <CardContent sx={{ p: 1 }}>
            <Typography variant="h5">{portfolio.title}</Typography>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                height: "100%",
                overflow: "hidden",
                mb: 2,
              }}
            >
              Thanks for taking a look at my project. This mobile responsive, full stack forum app
              was created whilst on the 13 week Software Development bootcamp at
              Northcoders. Click to learn more
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: { sm: 200 },
              objectFit: "contain",
              mt: { sm: 2 },
              mb: { xs: "auto", sm: 2 },
              ml: { sm: 3 },
              borderRadius: 1,
            }}
            image={portfolio.article_img_url}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
