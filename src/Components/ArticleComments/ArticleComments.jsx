import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, fetchCommentsById, postComment } from "../../App";
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
      author: loggedInUser.username,
      body: newComment,
      created_at: "0 seconds ago",
      votes: 0
    }
    setComments([optimisticComment, ...comments])
    event.preventDefault()
    postComment(article_id, loggedInUser, newComment).then(() => {
        setNewComment("")
        setErrorMessage("")
        setSuccessMessage("Comment posted!")
    }).catch((error) => {
      console.error("Comment patching failed:", error);
      setErrorMessage("Comment operation failed. Please try again.");
      setSuccessMessage("")
      
    })
  }

  const handleDelete = (comment_id, username) => {
    if(loggedInUser.username === username) {
      const updatedComments = comments.filter((comment) => comment.comment_id !== comment_id)
      setComments(updatedComments)
      deleteComment(comment_id).then(() => {
        setSuccessMessage("Comment deleted!")
        setErrorMessage("")
      }).catch((error) => {
        console.error("Delete failed:", error);
        setComments(comments)
        setErrorMessage("Unable to perform delete action!")
        setSuccessMessage("")
      })
    } else {
      setErrorMessage("Unable to delete a comment that is not your own")
      setSuccessMessage("")
    }

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
            <ArticleComment key={index} comment={comment} onDelete={() => handleDelete(comment.comment_id, comment.author)} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ArticleComments;
