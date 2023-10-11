import { useContext } from "react";
import { Context } from "../contexts/Contexts";
import UserArticles from "./UserArticles";
import { Card, CardContent, Typography } from "@mui/material";

export default function UserProfile({ articles, setArticles }) {
  const { user } = useContext(Context);
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4">Logged in user: {user.username}</Typography>
          <Typography>Login and user auth features coming soon</Typography>
        </CardContent>
      </Card>
      <UserArticles articles={articles} setArticles={setArticles} />
    </div>
  );
}
