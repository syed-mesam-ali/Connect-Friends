import React from "react";
import { Link } from "react-router-dom";

const Header = ({ handleShow, handleShowRelations }) => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ background: "#151a25" }}
      >
        <Link to="/" className="navbar-brand navbar-brand-style">
          <i class="fa fa-connectdevelop"></i> &nbsp;&nbsp;Connect Friends
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/" title="Click to view User List">
                <i class="fa fa-home"></i> Home
              </Link>
            </li>
            <li className="nav-item active">
              <span
                className="nav-link"
                onClick={() => {
                  handleShow();
                }}
                title="Click to add new user to the list"
              >
                <i class="fa fa-users"></i> Add User
              </span>
            </li>
            <li className="nav-item active">
              <span
                className="nav-link"
                onClick={() => {
                  handleShowRelations();
                }}
                title="Click to update relations between user"
              >
                <i class="fa fa-plus"></i> Create Relations
              </span>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/view"
                title="Click to view relation between all users"
              >
                <i class="fa fa-eye"></i> View Relations
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/find"
                title="Click to Find Relations between 2 user"
              >
                <i class="fa fa-search"></i> Find Relations
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
