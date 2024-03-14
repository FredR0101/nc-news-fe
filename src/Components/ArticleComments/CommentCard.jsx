import "./ArticleComments.css";
import moment from "moment";
import Button from "@mui/material/Button";

const ArticleComment = (props) => {
  const { comment, onDelete } = props;
  const date = moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
  const handleDelete = () => {
    onDelete(comment.comment_id)
  }


  return (
    <li className="comment-card">
      <p>Comment: {comment.body}</p>
      <p>Author: {comment.author}</p>
      <p>Created at: {date}</p>
      <p>Votes: {comment.votes}</p>{" "}
      <Button
        variant="contained"
        size="small"
        style={{ color: "black" }}
        className="delete-button"
        onClick={handleDelete}
      >
        Delete Comment
      </Button>
    </li>
  );
};

export default ArticleComment;
