import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommentsById } from '../../App';
import ArticleComment from './CommentCard';
import "./ArticleComments.css"

const ArticleComments = () => {
    const [comments, setComments] = useState([])
    const {article_id} = useParams()

    useEffect(() => {
        fetchCommentsById(article_id).then((articleComments) => {
            setComments(articleComments)
        })
    }, [article_id])

    return (
        <div className='comment-list'>
            <ul>
                {comments.map((comment, index) => (
                    <ArticleComment key={index} comment={comment}/>
                ))}
            </ul>
        </div>
    )
} 

export default ArticleComments