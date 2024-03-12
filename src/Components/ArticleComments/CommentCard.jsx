import "./ArticleComments.css"


const ArticleComment = (props) => {
    const {comment} = props
    return (
        <li className="comment-card">
            <p>Comment: {comment.body}</p>
            <p>Author: {comment.author}</p>
            <p>Created at: {comment.created_at}</p>
            <p>Votes: {comment.votes}</p>
        </li>
    )
}

export default ArticleComment