import React from "react";

const ViewRelations = ({ userRelationsMap }) => {
  let relationList = [];
  for (let user in userRelationsMap) {
    for (let i = 0; i < userRelationsMap[user].length; i++) {
      relationList.push(
        <li key={user + i}>
          {user} is friend of {userRelationsMap[user][i]}
        </li>
      );
    }
  }
  return (
    <div className="m-sm-4">
      <h3>
        {relationList.length == 0
          ? "No Relation Available, Click on Create Relations "
          : "Available Relation List"}
      </h3>
      <ul>{relationList}</ul>
    </div>
  );
};

export default ViewRelations;
