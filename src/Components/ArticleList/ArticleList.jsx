import { useEffect, useState } from "react";
import { getArticles } from "../../App";
import ArticleCard from "./ArticleCard";
import "./articleList.css";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic).then((response) => {
      setIsLoading(false);
      setArticles(response);
      setErrorMessage("")
    });
  }, [topic]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const topicParam = params.get("topic");
    if (topicParam !== null) {
      setTopic(topicParam);
    }
  }, [searchParams]);

  const handleChange = (event) => {
    setTopic(event.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("topic", event.target.value);
    setSearchParams(params.toString());
  };

  if (isLoading) return <div className="loader"></div>;
  return (
    <>
      <FormControl
        sx={{
          m: 1,
          minWidth: 100,
          transform: "translateX(200px) translateY(30px)",
        }}
      >
        <InputLabel id="topic-selector">Topic</InputLabel>
        <Select
          labelId="topic-label"
          id="topic-select"
          value={topic}
          label="Topic"
          onChange={handleChange}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"coding"}>Coding</MenuItem>
          <MenuItem value={"football"}>Football</MenuItem>
          <MenuItem value={"cooking"}>Cooking</MenuItem>
        </Select>
      </FormControl>
      <br />
      <div className="article-list">
        <ul>
          {articles.map((article, index) => (
            <Link to={`/articles/${article.article_id}`} key={index}>
              <ArticleCard key={index} article={article} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ArticleList;
