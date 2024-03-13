import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, PatchVotesByArticleId } from "../../App";
import "./ArticleData.css";
import ArticleComments from "../ArticleComments/ArticleComments";
import Button from "@mui/material/Button";

const ArticleData = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [votes, setVotes] = useState(0)

  const SendVotes = (article_id, isIncrement) => {
    if (isFetching || isButtonDisabled) return;
    setIsFetching(true);
    setIsButtonDisabled(true);
    setArticle((currArticle) => {
      if (currArticle.article_id === article_id) {
        return {
          ...currArticle,
          votes: isIncrement ? currArticle.votes + 1 : currArticle.votes - 1,
        };
      }
      return currArticle;
    });
    const voteChange = isIncrement ? 1 : -1;
    PatchVotesByArticleId(article_id, voteChange).then(() => {
      setIsFetching(false);
      setErrorMessage("")
      setVotes((prevVotes) => prevVotes + (isIncrement ? 1 : -1));     
    }).catch((error) => {
        console.error("Vote patching failed:", error);
        setErrorMessage("Vote operation failed. Please try again.");
        setArticle((currArticle) => ({
          ...currArticle,
          votes: isIncrement ? currArticle.votes - 1 : currArticle.votes + 1,
        }));
    })
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id).then((articleData) => {
      setIsLoading(false);
      setArticle(articleData);
      setVotes(articleData.votes)
    });
  }, [article_id]);

  if (isLoading) return <div className="loader"></div>;
  return (
    <div className="single-article">
      <p className="articleTitle">{article.title}</p>
      <img
        src={article.article_img_url}
        className="articleDataImage"
        alt="article image"
      />
      <p>Category: {article.topic}</p>
      <p>Written by: {article.author}</p>
      <p>Created at: {article.created_at}</p>
      <p>Votes: {votes}</p>
      <Button
        variant="contained"
        size="small"
        style={{ color: "black" }}
        className="upvote-button"
        disabled={isButtonDisabled}
        onClick={() => {
          SendVotes(article.article_id, true);
        }}
      >
        Upvote!
      </Button>
      <Button
        variant="contained"
        size="small"
        style={{ color: "black" }}
        className="upvote-button"
        disabled={isButtonDisabled}
        onClick={() => {
          SendVotes(article.article_id, false);
        }}
      >
        Downvote!
      </Button>
      <p className="error-message">{errorMessage}</p>
      <p>Comment count: {article.comment_count}</p>
      <br />
      <p>{article.body}</p>
      <br />
      <br />
      <br />
      <p>Comments:</p>
      <ArticleComments />
    </div>
  );
};

export default ArticleData;
