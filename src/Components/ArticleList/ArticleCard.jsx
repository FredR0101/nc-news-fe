import "./articleList.css"
import moment from "moment";

const ArticleCard = (props) => {
    const {article} = props
    const date = moment(article.created_at).format("YYYY-MM-DD HH:mm:ss");
    return (
        <li className="article-card">
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="article image" />
            <p>{article.topic}</p>
            <p>{article.author}</p>
            <p>Votes: {article.votes}</p>
            <p>Comment Count: {article.comment_count}</p>
            <p>Created at: {date}</p>
        </li>
    )
}

export default ArticleCard