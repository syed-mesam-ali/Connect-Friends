import React from "react";

const UserList = ({ usersMapWithId }) => {
  return (
    <div className="m-sm-4">
      <h3>
        {Object.keys(usersMapWithId).length == 0
          ? "No User Available, Click on Add user "
          : "Available User List"}
      </h3>
      <ul>
        {Object.keys(usersMapWithId).map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
