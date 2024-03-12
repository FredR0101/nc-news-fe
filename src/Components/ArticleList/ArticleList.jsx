import { useEffect, useState } from "react";
import { getArticles } from "../../App";
import ArticleCard from "./ArticleCard";
import "./articleList.css";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then((response) => {
      setIsLoading(false);
      setArticles(response);
    });
  }, []);

  if (isLoading) return <div className="loader"></div>
  return (
    <>
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
