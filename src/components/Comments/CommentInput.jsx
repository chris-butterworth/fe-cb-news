import { useState } from "react";
import { postComment } from "../../../api";

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
        <button
          className="comment-input-activate-button"
          onClick={() => {
            setInputActive(true);
          }}
        >
          Leave a comment
        </button>
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
          <button
            type="button"
            className="comment-input-deactivate-button"
            onClick={() => {
              setInputActive(false);
              setInputField("");
            }}
          >
            X
          </button>
          <button
            type="submit"
            className="comment-input-submit-button"
            onClick={handleSubmit}
          >
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
}
