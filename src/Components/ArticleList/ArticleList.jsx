import { useEffect, useState } from "react";
import { getArticles } from "../../App";
import ArticleCard from "./ArticleCard";
import "./articleList.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ErrorPage from "../ErrorPage/ErrorPage";


const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const { topic } = useParams();
  const navigate = useNavigate();
  const [newError, setnewError] = useState(null);
  

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, order)
      .then((response) => {
        setArticles(response);
      })
      .catch((err) => {
        setnewError(err.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeTopic = (event) => {
    if (event.target.value) {
      navigate(`/articles/topic/${event.target.value}`);
    } else {
      navigate("/");
    }
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  if (newError) {
    return <h1><ErrorPage err={newError.status} message={newError.data.msg} /></h1>;
  } else {
    if (isLoading) return <div className="loader"></div>;
    return (
      <>
        <FormControl
          sx={{
            m: 1,
            minWidth: 100,
            left: "3%",
            top: "30px",
            right: "3%"
          }}
        >
          <InputLabel id="selectors">Topic</InputLabel>
          <Select
            labelId="topic-label"
            id="topic-select"
            value={topic || ""}
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
            left: "3%",
            top: "30px",
            right: "3%"
          }}
        >
          <InputLabel id="selectors">Sort By</InputLabel>
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
            left: "3%",
            top: "30px",
            right: "3%"
          }}
        >
          <InputLabel id="selectors">Order</InputLabel>
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
              <Link to={`/articles/${article.article_id}`} key={index} className="link-no-underline">
                <ArticleCard key={index} article={article} />
              </Link>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default ArticleList;
