import { useEffect, useState } from "react";
import "./user.css"
import { getUsers } from "../../App";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((response) => {
      setIsLoading(false);
      setUsers(response);
    });
  }, []);

  if (isLoading) return <div className="loader"></div>;
  return (
    <div className="user-list">
      <ul>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
