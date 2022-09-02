import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Signup.css";
import { SIGNUP_USER } from "../mutations/userMutations";
import { GET_USERS } from "../queries/userQueries";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [signupUser] = useMutation(SIGNUP_USER, {
    variables: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      address: userData.address,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
    },
  });
  // console.log(addUser);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    if (
      userData.first_name == "" ||
      userData.last_name == "" ||
      userData.address == "" ||
      userData.email == "" ||
      userData.phone == "" ||
      userData.password != userData.confirm_password
    ) {
      return alert("Please check the form again.");
    }

    signupUser(
      userData.first_name,
      userData.last_name,
      userData.address,
      userData.email,
      userData.phone,
      userData.password
    ).then((res) => {
      if (res.data.signupUser.user_unique_id !== "") {
        navigate("/");
      }
    });
  };

  return (
    <div className="ui container login">
      <h2 className="ui header">SIGN UP</h2>
      <div className="ui grid">
        <div className="row">
          <div className="ten wide column">
            <div className="ui segment">
              <form className="ui form" onSubmit={onSubmit}>
                <div className="field">
                  <div className="two fields">
                    <div className="field">
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={userData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={userData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="field fluid">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <div className="two fields">
                    <div className="field">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={userData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="ui icon input field fluid">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                  <i
                    style={{ zIndex: 1 }}
                    onClick={() => {
                      console.log("clicked");
                      setShowPassword(!showPassword);
                    }}
                    className={
                      showPassword
                        ? "ui eye link icon"
                        : "ui eye slash outline link icon"
                    }
                  ></i>
                  {/* </span> */}
                </div>
                <div className="ui icon input field fluid">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={userData.confirm_password}
                    onChange={handleChange}
                  />
                  <i
                    className={
                      showConfirmPassword
                        ? "eye link icon"
                        : "eye slash outline link icon"
                    }
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  ></i>
                </div>
                {userData.password === userData.confirm_password ? (
                  ""
                ) : (
                  <div className="ui input field fluid">
                    <div
                      className="ui red mini message fluid"
                      style={{ width: "100%" }}
                    >
                      Password fields don't match
                    </div>
                  </div>
                )}

                <button className="ui blue button" type="submit">
                  SIGNUP
                </button>
                <p>
                  Already have an account?{" "}
                  <span className="ui blue">
                    <Link to="/">Signin</Link>
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

export default Signup;
