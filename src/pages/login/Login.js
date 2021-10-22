import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { paths } from "../../constants";
import { authApi } from "../../components/api";
import { parseAccessToken } from "../../helpers";
// import PersonIcon from "@material-ui/icons/Person";
// import Box from "@material-ui/core/Box";

const Login = ({ history, match }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value.trim());
    setEmailError("");
  };

  const handleBlurEmail = () => {
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setEmailError(emailValid ? "" : "Email is incorrect");
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value.trim());
    setPasswordError("");
  };

  const handleBlurPassword = () => {
    const passwordValid = password.length >= 6;
    setPasswordError(passwordValid ? "" : "Password is too short");
  };

  const handleSubmit = async () => {
    setLoginError("");
    await authApi
      .login(email, password, match.path)
      .then((response) => {
        console.log(match.path);
        console.log(response.data.access_token);
        if (response.data.access_token) {
          console.log("accessToken");
          localStorage.setItem("accessToken", response.data.access_token);
          const decodedPayload = parseAccessToken();
          if (decodedPayload.role === "admin") {
            history.push(paths.admin.users());
          } else {
            history.push(paths.user.reservation());
          }
        } else {
          setLoginError("Server error");
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          return setLoginError(err.response.data.message);
        }
        setLoginError("Server error");
      });
  };

  return (
    <div>
      <div className="App-header">
        <h2 className="text-header">Workplace Reservation</h2>
      </div>
      <form className="demoForm" style={{ width: "500px", margin: "auto" }}>
        <h2 className="textForm">Login</h2>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Email address"
            variant="outlined"
            value={email}
            onChange={handleChangeEmail}
            onBlur={handleBlurEmail}
            className="form-control"
            name="email"
            helperText={emailError}
            error={!!emailError}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-password-input"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleChangePassword}
            onBlur={handleBlurPassword}
            className="form-control"
            name="password"
            helperText={passwordError}
            error={passwordError}
          />
        </div>
        {/* <div>login for admin</div> */}
        <Button
          className="buttonLogin"
          variant="contained"
          color="primary"
          disabled={emailError || passwordError}
          onClick={handleSubmit}
        >
          Login
        </Button>

        {loginError ? (
          <div
            style={{
              textAlign: "start",
              marginTop: 30,
              paddingLeft: "25px",
              color: "rgb(182, 43, 43)",
            }}
          >
            - {loginError}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
