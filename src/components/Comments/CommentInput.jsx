import { useState } from "react";
import { postComment } from "../../../api";
import { Button } from "@mui/material";

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
    <div className="comment-input">
      {!inputActive && (
        <Button
          className="comment-input-activate-Button"
          onClick={() => {
            setInputActive(true);
          }}
        >
          Leave a comment
        </Button>
      )}
      {inputActive && (
        <form className="comment-input-form">
          <textarea
            className="comment-input-field"
            value={inputField}
            onChange={(e) => {
              setInputField(e.target.value);
            }}
          ></textarea>
          <Button
            type="Button"
            className="comment-input-deactivate-Button"
            onClick={() => {
              setInputActive(false);
              setInputField("");
            }}
          >
            X
          </Button>
          <Button
            type="submit"
            className="comment-input-submit-Button"
            onClick={handleSubmit}
          >
            Add Comment
          </Button>
        </form>
      )}
    </div>
  );
}
