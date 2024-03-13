import UserContext from "../Contexts/User";
import "./user.css"
import { useContext } from "react";
import Button from "@mui/material/Button";

const UserCard = (props) => {
  const {user} = props;
  const {setLoggedInUser} = useContext(UserContext)
  return (
    <li className="user-card">
      <img src={user.avatar_url} alt="user-image" />
      <h2>{user.username}</h2>
      <p>{user.name}</p>
      <Button
        variant="contained"
        size="small"
        style={{ color: "black" }}
        className="upvote-button"
        onClick={() => {setLoggedInUser(user)}}
      >Log In! </Button>
    </li>
  );
};

export default UserCard
