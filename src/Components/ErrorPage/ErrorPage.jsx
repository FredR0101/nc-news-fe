import "./ErrorPage.css"

const ErrorPage = ({err, message}) => {
    if (err && message) {
        return <div className="errorpage-message">Error {err} occurred: {message}</div>;
    } else {
        return <div className="errorpage-message">An unexpected error has occurred.</div>;
    }
}

export default ErrorPage