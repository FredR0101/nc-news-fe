import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, incPatchVotesByArticleId, decPatchVotesByArticleId } from '../../App';
import "./ArticleData.css"
import ArticleComments from '../ArticleComments/ArticleComments';
import Button from '@mui/material/Button';

const ArticleData = () => {
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchingInc, setIsFetchingInc] = useState(false)
    const [isFetchingDec, setIsFetchDec] = useState(false)

    const incSendVotes = (article_id) => {
        if (isFetchingInc) return;
        setIsFetchingInc(true);
        setArticle((currArticle) => {
            console.log(currArticle);
            if(currArticle.article_id === article_id ) {
                return {...currArticle, votes: currArticle.votes + 1}
            }
            return currArticle
        })
        incPatchVotesByArticleId(article_id).then(() => setIsFetchingInc(false))
    }

    const decSendVotes = (article_id) => {
        if(isFetchingDec) return;
        setIsFetchDec(true)
        setArticle((currArticle) => {
            console.log(currArticle);
            if(currArticle.article_id === article_id ) {
                return {...currArticle, votes: currArticle.votes - 1}
            }
            return currArticle
        })
        decPatchVotesByArticleId(article_id).then(() => setIsFetchDec(false))
    }

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
            <Button variant="contained" size='small' style={{color: 'black'}} className="upvote-button" onClick={() => {incSendVotes(article.article_id)}}>Upvote!</Button>
            <Button variant="contained" size='small' style={{color: 'black'}} className="upvote-button" onClick={() => {decSendVotes(article.article_id)}}>Downvote!</Button>
            <br />
            <br />
            <p>Comments:</p>
            <ArticleComments/>
        </div>
    )
}

export default ArticleData