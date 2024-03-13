import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsById, postComment } from "../../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArticleComment from "./CommentCard";
import "./ArticleComments.css";
import UserContext from "../Contexts/User";
import { useContext } from "react";

const ArticleComments = () => {
  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { article_id } = useParams();
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (event) => {
    const optimisticComment = {
      username: loggedInUser,
      body: newComment
    }
    setComments([optimisticComment, ...comments])
    event.preventDefault()
    postComment(article_id, loggedInUser, newComment).then(() => {
        setNewComment("")
        setErrorMessage("")
        setSuccessMessage("Comment successful!")
    }).catch((error) => {
      console.error("Comment patching failed:", error);
      setErrorMessage("Comment operation failed. Please try again.");
      setSuccessMessage("")
      
    })
  }

  useEffect(() => {
    fetchCommentsById(article_id).then((articleComments) => {
      setComments(articleComments);
      
    });
  }, [article_id]);



  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Enter New Comment"
          variant="filled"
          style={{ color: "black" }}
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          style={{ color: "black" }}
          className="comment-submit-button"
          sx={{
            marginLeft: "1em",
            height: "55px",
          }}
          disabled={newComment ? false : true}
          type="submit"
        >
          Submit!
        </Button>
        <br />
        <p className="error-message">{errorMessage}</p>
        <p className="success-message">{successMessage}</p>
      </form>
      <br />
      <div className="comment-list">
        <ul>
          {comments.map((comment, index) => (
            <ArticleComment key={index} comment={comment} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ArticleComments;
