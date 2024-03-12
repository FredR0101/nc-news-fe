import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../App';
import "./ArticleData.css"
import ArticleComments from '../ArticleComments/ArticleComments';

const ArticleData = () => {
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetchArticleById(article_id).then((articleData) => {
            setIsLoading(false)
            setArticle(articleData)
        })
    }, [article_id])

    if(isLoading) return <div className="loader"></div>
    return (
        <div className='single-article'>
            <p className='articleTitle'>{article.title}</p>
            <img src={article.article_img_url} className='articleDataImage' alt="article image"/>
            <p>Category: {article.topic}</p>
            <p>Written by: {article.author}</p>
            <p>Created at: {article.created_at}</p>
            <p>Votes: {article.votes}</p>
            <p>Comment count: {article.comment_count}</p>
            <br />
            <p>{article.body}</p>
            <br />
            <br />
            <p>Comments:</p>
            <ArticleComments/>
        </div>
    )
}

export default ArticleData