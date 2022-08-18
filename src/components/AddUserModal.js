import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddUserModal({
  handleClose,
  show,
  setUsersMapWithId,
  usersMapWithId,
}) {
  const inputName = useRef(null); // get input box name
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <i class="fa fa-users"></i> Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            placeholder="Enter the User name"
            ref={inputName}
          />
          <small className="m-sm-2">
            (Note : You can check all the users by clicking on Home)
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <i class="fa fa-times"></i> Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              let name = inputName.current.value;
              if (name == "") {
                alert("Name cannot be empty");
                return;
              }
              if (Object.keys(usersMapWithId).includes(name)) {
                alert("Name already Present");
                return;
              }
              setUsersMapWithId((prevState) => ({
                ...prevState,
                [name]: Object.keys(prevState).length,
              }));
              inputName.current.value = "";
            }}
          >
            <i class="fa fa-plus"></i> Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddUserModal;
