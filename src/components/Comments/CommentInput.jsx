import { useState } from "react";
import { postComment } from "../../../api";
import { Box, Button, Card, Container, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function CommentInput({ setComments, user, article_id }) {
  const [inputActive, setInputActive] = useState(false);
  const [inputField, setInputField] = useState("");

  const handleSubmit = (e) => {
    const date = new Date();
    const timeNow = date.toISOString();
    e.preventDefault();
    setComments((currComments) => {
      return [
        {
          comment_id: Math.random().toString(),
          votes: 1,
          author: user,
          body: inputField,
          created_at: timeNow,
        },
        ...currComments,
      ];
    });
    postComment(article_id, user, inputField)
      .catch(() => {
        alert("your comment could not be added at this time");
      })
      .then(() => {
        setInputField("");
        setInputActive(false);
      });
  };

  return (
    <Container
      sx={{
        borderTop: 10,
        borderBottom: 10,
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
        <Container className="comment-input-form" sx={{ p: 0 }}>
          <TextField
            label="Comment"
            className="comment-input-field"
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
              className="comment-input-deactivate-Button"
              onClick={() => {
                setInputActive(false);
                setInputField("");
              }}
            >
              <CloseIcon />
            </Button>
            <Button
              type="submit"
              className="comment-input-submit-Button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Container>
        </Container>
      )}
    </Container>
  );
}
