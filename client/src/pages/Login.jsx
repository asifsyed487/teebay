import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../mutations/userMutations";
import { LoginAction } from "../redux/actions/LoginAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    loading: false,
    error: "",
  });
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      email: userData.email,
      password: userData.password,
    },
    // update(cache, { data: { loginUser } }) {
    //   const { users } = cache.readQuery({
    //     query: GET_USERS,
    //   });
    // },
  });
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      return alert("Please Fill in All the Fields!");
    }
    // setTimeout(() => {
    loginUser(userData.email, userData.password).then((res) => {
      if (
        res.data.loginUser.token === "Username or Password does not match" ||
        res.data.loginUser.token === "" ||
        res.data.loginUser.token === "undefined" ||
        res.data.loginUser.token === undefined
      ) {
        setUserData({
          ...userData,
          error: "Username or Password does not match",
        });
      } else {
        console.log(res.data.loginUser.token);
        localStorage.setItem("usertoken_hash", res.data.loginUser.token);
        dispatch(LoginAction(true));
        navigate("/myproducts");
      }
    });
    // }, 1000);
  };
  return (
    <div className="ui container login">
      <h2 className="ui header">SIGN IN</h2>
      <div className="ui grid">
        <div className="row">
          <div className="six wide column">
            <div className="ui segment">
              <form onSubmit={onSubmit} className="ui form">
                <div className="ui mini input field fluid">
                  <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="ui mini input field fluid">
                  <input
                    type="text"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>

                <button
                  className="ui blue button"
                  onClick={(e) => {
                    setUserData({
                      ...userData,
                      loading: true,
                    });
                  }}
                  type="submit"
                >
                  {userData.loading ? (
                    <div className="ui active tiny inline loader"></div>
                  ) : (
                    "LOGIN"
                  )}
                </button>
                {userData.error !== "" ? (
                  <div style={{ marginTop: "0px !important", color: "red" }}>
                    {userData.error}
                  </div>
                ) : (
                  ""
                )}
                <p>
                  Dont have an account?{" "}
                  <span className="ui blue">
                    {" "}
                    <Link to="/signup">Signup</Link>{" "}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
