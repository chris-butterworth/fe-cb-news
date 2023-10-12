import { useContext, useState } from "react";
import { postComment } from "../../../api";
import { Button, Container, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Context } from "../contexts/Contexts";

export default function CommentInput({ setComments, article_id }) {
  const [inputActive, setInputActive] = useState(false);
  const [inputField, setInputField] = useState("");
  const [error, setError] = useState(false);
  const { user } = useContext(Context);
  const handleSubmit = (e) => {
    setError(false);
    const date = new Date();
    const timeNow = date.toISOString();
    e.preventDefault();
    setComments((currComments) => {
      return [
        {
          comment_id: Math.random().toString(),
          votes: 1,
          author: user.username,
          body: inputField,
          created_at: timeNow,
        },
        ...currComments,
      ];
    });
    postComment(article_id, user.username, inputField)
      .then(() => {
        setInputField("");
        setInputActive(false);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Container
      sx={{
        borderTop: 15,
        borderBottom: 15,
        borderColor: "lightgrey",
        p: 1,
      }}
    >
      {!inputActive && (
        <Button
          className="comment-input-activate-Button"
          onClick={() => {
            setInputActive(true);
            document.querySelector("#comments").scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }}
          sx={{ width: "100%" }}
        >
          Leave a comment
        </Button>
      )}
      {inputActive && (
        <Container sx={{ p: 0 }}>
          <TextField
            error={error}
            label={error ? "Error" : "Comment"}
            helperText={error && "Your comment could not be added at this time"}
            value={inputField}
            multiline
            minRows={3}
            onChange={(e) => {
              setInputField(e.target.value);
            }}
            sx={{ width: "100%", m: "auto", p: 0 }}
          ></TextField>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="Button"
              onClick={() => {
                setInputActive(false);
                setInputField("");
              }}
            >
              <CloseIcon />
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Container>
        </Container>
      )}
    </Container>
  );
}