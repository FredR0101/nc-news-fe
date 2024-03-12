import "./articleList.css"
const ArticleCard = (props) => {
    const {article} = props
    return (
        <li className="article-card">
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="article image" />
            <p>{article.topic}</p>
            <p>{article.author}</p>
        </li>
    )
}

export default ArticleCard