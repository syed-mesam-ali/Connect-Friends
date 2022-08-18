import "./App.css";
import AddUserModal from "./components/AddUserModal";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import UserList from "./components/UserList";
import FindRelations from "./components/FindRelations";
import CreateRelations from "./components/CreateRelations";
import ViewRelations from "./components/ViewRelations";
import Footer from "./components/Footer";

function App() {
  const [show, setShow] = useState(false); // show hide modal for add user
  const [showRelations, setShowRelations] = useState(false); // show hide modal for Create relations
  const [usersMapWithId, setUsersMapWithId] = useState({}); //user to id map
  const [userRelationsMap, setUserRelationsMap] = useState({}); //user realtionship map
  const [relationTypes, setRelationTypes] = useState(["Friend"]); // Relationship types map

  const handleClose = () => setShow(false); // hide modal add user
  const handleShow = () => setShow(true); // show modal add user
  const handleCloseRelations = () => setShowRelations(false); // hide modal create relations
  const handleShowRelations = () => setShowRelations(true); // show modal create relations

  useEffect(() => {
    //checking for confirmation while reload browser
    window.onbeforeunload = function () {
      return "";
    };
  }, []);

  return (
    <div>
      <div>
        <AddUserModal
          handleClose={handleClose}
          show={show}
          setUsersMapWithId={setUsersMapWithId}
          usersMapWithId={usersMapWithId}
        />
        <CreateRelations
          show={showRelations}
          handleCloseRelations={handleCloseRelations}
          usersMapWithId={usersMapWithId}
          setUserRelationsMap={setUserRelationsMap}
          relationTypes={relationTypes}
        />
        <BrowserRouter>
          <div className="textColor">
            <Header
              handleShow={handleShow}
              handleShowRelations={handleShowRelations}
            />
            <Route
              path="/"
              exact
              component={() => <UserList usersMapWithId={usersMapWithId} />}
            />
            <Route
              path="/find"
              exact
              component={() => (
                <FindRelations
                  userRelationsMap={userRelationsMap}
                  usersMapWithId={usersMapWithId}
                />
              )}
            />
            <Route
              path="/view"
              exact
              component={() => (
                <ViewRelations userRelationsMap={userRelationsMap} />
              )}
            />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
