import { useNavigate } from "react-router-dom";
import { timeSince } from "../../../utils";
import { portfolio } from "../../Portfolio";
import { Button, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreditPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon />
      </Button>
      <CardContent
        sx={{ display: "flex", justifyContent: "space-between", pb: 0 }}
      >
        <Typography gutterBottom>{portfolio.author}</Typography>
        <Typography color="text.secondary" gutterBottom>
          {timeSince(portfolio.created_at)}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          p: 1,
          pt: 0,
          pb: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ m: 1 }} variant="h5">
          {portfolio.title}
        </Typography>
        <CardMedia
          component="img"
          image={portfolio.article_img_url}
          sx={{
            objectFit: "contain",
            borderRadius: 1,
          }}
        />

        <Typography sx={{ m: 1 }}>{portfolio.body}</Typography>
      </CardContent>
    </div>
  );
}
