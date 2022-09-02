import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginAction } from "../redux/actions/LoginAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    // localStorage.clear();
    dispatch(LoginAction(false));
    navigate("/");
  };
  return (
    <div className="ui secondary  menu" style={{ margin: "1rem" }}>
      <a className="item"></a>
      <a className="item"></a>
      <div className="right menu">
        <div className="item">
          <div className="ui icon input"></div>
        </div>
        <button className="ui violet basic button" onClick={logOut}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Header;
