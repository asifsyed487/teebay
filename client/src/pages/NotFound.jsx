import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="ui container">
      <div class="ui red icon message" style={{ marginTop: "5rem" }}>
        <i class="notched exclamation triangle icon"></i>
        <div class="content" style={{ padding: "1rem" }}>
          <div class="header" style={{ padding: "1rem" }}>
            Sorry! this page does not exist...
          </div>
          <Link to="/" className="ui blue button">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
