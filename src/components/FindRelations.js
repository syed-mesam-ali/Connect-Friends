import React, { useEffect, useState } from "react";

const FindRelations = ({ userRelationsMap, usersMapWithId }) => {
  const [firstName, setFirstName] = useState("-1"); // dropdown value save
  const [secondName, setSecondName] = useState("-1"); // dropdown value save
  const [usersMapWithIdMod, setUsersMapWithIdMod] = useState(usersMapWithId);
  const [adjListMap, setAdjListMap] = useState(); //connecting graph vertices
  const [pathMap, setPathMap] = useState([]); //final path between users

  // Prints all paths from
  // 's' to 'd'
  function printAllPaths(s, d) {
    let isVisited = new Array(adjListMap.length);
    for (let i = 0; i < adjListMap.length; i++) isVisited[i] = false;
    let pathList = [];

    // add source to path[]
    pathList.push(s);

    // Call recursive utility
    printAllPathsUtil(s, d, isVisited, pathList);
  }

  const handleFind = () => {
    let startPosition = usersMapWithId[firstName];
    let endPosition = usersMapWithId[secondName];
    printAllPaths(startPosition, endPosition);
  };
  const arrayWithAllThePaths = [];
  function printAllPathsUtil(u, d, isVisited, localPathList) {
    if (u == d) {
      if (localPathList.length <= 8 && localPathList.length >= 2) {
        arrayWithAllThePaths.push([...localPathList]);
        setPathMap(arrayWithAllThePaths);
      }

      // if match found then no need to
      // traverse more till depth
      return;
    }

    // Mark the current node
    isVisited[u] = true;

    // Recur for all the vertices
    // adjacent to current vertex
    for (let i = 0; i < adjListMap[u].length; i++) {
      if (!isVisited[adjListMap[u][i]]) {
        // store current node
        // in path[]
        localPathList.push(adjListMap[u][i]);
        printAllPathsUtil(adjListMap[u][i], d, isVisited, localPathList);

        // remove current node
        // in path[]
        localPathList.splice(localPathList.indexOf(adjListMap[u][i]), 1);
      }
    }

    // Mark the current node
    isVisited[u] = false;
  }

  useEffect(() => {
    //create mapping between vertices
    let adjList = new Array(Object.keys(usersMapWithId).length);
    for (let key in userRelationsMap) {
      let _arr = [];
      for (let i = 0; i < userRelationsMap[key].length; i++) {
        _arr.push(usersMapWithId[userRelationsMap[key][i]]);
      }
      adjList[usersMapWithId[key]] = _arr;
    }
    adjList = Array.from(adjList, (item) => item || []);
    setAdjListMap(adjList);
  }, [userRelationsMap, usersMapWithId]);

  const chnageToString = (arrayWithPath) => {
    // coverting vertices to valid name connections
    let pathString = "";
    arrayWithPath.forEach((element) => {
      pathString += " > " + Object.keys(usersMapWithId)[element];
    });
    return pathString.substring(2);
  };

  return (
    <div className="m-sm-4">
      <h3>
        {Object.keys(userRelationsMap).length === 0
          ? "To Find Relation please create some relation between users"
          : "Find Relations"}
      </h3>
      <div className="row findRelationRow">
        <div className="col-lg-4">
          <select
            onChange={(e) => {
              setFirstName(e.target.value);
              let updatedList = JSON.parse(JSON.stringify(usersMapWithId));
              delete updatedList[e.target.value];
              setUsersMapWithIdMod(updatedList);
            }}
            value={firstName}
            className="custom-select"
          >
            <option value="-1">Select First User</option>
            {Object.keys(usersMapWithId).map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-1">
          <h4 style={{ marginLeft: "25px" }}>&</h4>
        </div>
        <div className="col-lg-4">
          <select
            onChange={(e) => setSecondName(e.target.value)}
            value={secondName}
            className="custom-select"
          >
            <option value="-1">Select Second User</option>
            {Object.keys(usersMapWithIdMod).map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (firstName == "-1" || secondName == "-1") {
                alert("Select User to Find Relations");
                return;
              }
              handleFind();
            }}
          >
            <i class="fa fa-search"></i> Find
          </button>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "15px" }}
            onClick={() => {
              setFirstName("-1");
              setSecondName("-1");
              setPathMap([]);
            }}
          >
            <i class="fa fa-times"></i> Reset
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h3>
            {pathMap.length === 0
              ? "No Relations available"
              : "Following are possible relations"}
          </h3>
          <ul className="ulOfFindRelation">
            {pathMap.map((path, index) => (
              <li key={index}>{chnageToString(path)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FindRelations;
