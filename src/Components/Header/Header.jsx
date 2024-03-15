import "./Header.css";
import { useContext } from "react";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import ArticleList from "../ArticleList/ArticleList";
import UserList from "../Users/UserList";
import UserContext from "../Contexts/User";

const Header = () => {
  const {loggedInUser} = useContext(UserContext)
  return (
    <header className="header">
      <div id="title-container">
        <h1 id="title">NC News</h1>
        <Link to="/" element={<ArticleList/>}>
        <Button variant="contained" size="large" style={{color: 'black'}} className="home-button">Home</Button>
        </Link>
        <Link to="/users" element={<UserList/>}>
        <Button variant="contained" size="large" style={{color: 'black'}} className="users-button">Users</Button>
        </Link>
      <img src={loggedInUser.avatar_url} alt="avatar image" className="header-profile-picture"/>
      <p className="header-login-message">Logged in as: {loggedInUser.username}</p>
      </div>
    </header>
  );
};

export default Header;
