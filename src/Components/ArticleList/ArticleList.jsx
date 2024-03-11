import { useEffect, useState } from "react";
import  {getArticles}  from "../../App";
import ArticleCard from "./ArticleCard";
import "./articleList.css"

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((response) => {
      setArticles(response);
    });
  }, []);

  return (
    <>
      <div className="article-list">
        <ul>{articles.map((article, index) => {
            return <ArticleCard key={index} article={article}/>
        })}</ul>
      </div>
    </>
  );
};

export default ArticleList;
