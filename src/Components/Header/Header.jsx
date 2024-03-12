import "./Header.css";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import ArticleList from "../ArticleList/ArticleList";

const Header = () => {
  return (
    <header>
      <div id="title-container">
        <h1 id="title">NC News</h1>
        <Link to="/" element={<ArticleList/>}>
        <Button variant="contained" size="large" style={{color: 'black'}} className="home-button">Home</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
