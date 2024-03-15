import { useEffect, useState } from "react";
import { getArticles } from "../../App";
import ArticleCard from "./ArticleCard";
import "./articleList.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ArticleList = () => {  
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("")
  const [order, setOrder] = useState("")
  const {topic} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
      getArticles(topic, sortBy, order).then((response) => {
        setArticles(response);
      }).finally(() => {
        setIsLoading(false)
      })
  }, [topic, sortBy, order]);

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value)
  };

  const handleChangeTopic = (event) => {
    if(event.target.value){
      navigate(`/articles/topic/${event.target.value}`)
    } else {
      navigate("/")
    }
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value)
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
          value={topic || ''}
          label="Topic"
          onChange={handleChangeTopic}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value={"coding"}>Coding</MenuItem>
          <MenuItem value={"football"}>Football</MenuItem>
          <MenuItem value={"cooking"}>Cooking</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          minWidth: 100,
          transform: "translateX(200px) translateY(30px)",
        }}
      >
        <InputLabel id="sort_by-selector">Sort By</InputLabel>
        <Select
          labelId="sort_by-label"
          id="sort_by-select"
          value={sortBy}
          label="Sort By"
          onChange={handleChangeSortBy}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"created_at"}>Date</MenuItem>
          <MenuItem value={"comment_count"}>Comment Count</MenuItem>
          <MenuItem value={"votes"}>Vote Count</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          minWidth: 100,
          transform: "translateX(200px) translateY(30px)",
        }}
      >
        <InputLabel id="order-selector">Order</InputLabel>
        <Select
          labelId="order-label"
          id="order-select"
          value={order}
          label="order"
          onChange={handleChangeOrder}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"ASC"}>Ascending</MenuItem>
          <MenuItem value={"DESC"}>Descending</MenuItem>
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
