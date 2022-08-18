import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CreateRelations = ({
  handleCloseRelations,
  show,
  usersMapWithId,
  setUserRelationsMap,
  relationTypes,
}) => {
  const [firstName, setFirstName] = useState("-1"); // dropdown value save
  const [secondName, setSecondName] = useState("-1"); // dropdown value save
  const [usersMapWithIdMod, setUsersMapWithIdMod] = useState(usersMapWithId); // drop down names for second drop down
  const [realtion, setRelation] = useState("-1"); // select relation type drop down
  return (
    <div>
      <Modal
        show={show}
        onHide={handleCloseRelations}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <i class="fa fa-plus"></i> Create Relations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small style={{ color: "red" }}>
            {Object.keys(usersMapWithId).length === 0
              ? "(Note : To Create Relation Please add some users by clicking on Add User )"
              : ""}
          </small>
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

          <div className="row">
            <div className="col-lg-1">
              <h4 className="createRelationH4">is </h4>
            </div>
            <div className="col-lg-7">
              <select
                onChange={(e) => setRelation(e.target.value)}
                value={realtion}
                className="custom-select select-relationType"
              >
                <option value="-1">Select Relation Type</option>
                {relationTypes.map((relation) => (
                  <option key={relation} value={relation}>
                    {relation}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-1">
              <h4 className="createRelationH4">of </h4>
            </div>
          </div>

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
          <small className="m-sm-2">
            (Note : You can check all the relations in View Relaions)
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseRelations();
              setFirstName("-1");
              setSecondName("-1");
              setRelation("-1");
            }}
          >
            <i class="fa fa-times"></i> Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (firstName == "-1" || secondName == "-1") {
                alert("Select User to update Relations");
                return;
              }
              if (realtion == "-1") {
                alert("Select Relation Type");
                return;
              }
              setUserRelationsMap((prevState) => {
                //creating relationship map
                if (prevState[firstName]) {
                  if (prevState[firstName].includes(secondName)) {
                    alert("They are already friends");
                  } else {
                    prevState[firstName].push(secondName);
                  }
                } else {
                  prevState[firstName] = [];
                  prevState[firstName].push(secondName);
                }
                // Reset dropdown
                setFirstName("-1");
                setSecondName("-1");
                setRelation("-1");
                return prevState;
              });
            }}
          >
            <i class="fa fa-pencil-square-o"></i> Update Relations
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRelations;
