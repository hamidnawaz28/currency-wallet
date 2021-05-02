import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { logIn, signUp } from "../../services/Auth";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles({
  container: {
    width: "20%",
    margin: "auto",
  },
  items: {
    padding: "10px",
    "& :nth-child(3)": {},
  },
});
const UserManage = ({ type, setAuth }) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { container, items } = useStyles();
  useEffect(() => {}, []);
  console.log(type);
  const authHandle = async () => {
    let data = {
      username,
      password,
    };
    if (type == "Login") {
      let res = await logIn(data);
      if (res == "Successful") {
        setAuth(true);
        history.push("/");
      }
    } else {
      let res = await signUp(data);
      if (res?.username) {
        alert("Account Registered");
        history.push("/auth/sign-in");
      } else alert("Error");
    }
  };
  return (
    <div className={container}>
      <h4>{type == "Login" ? "Login" : "Signup"}</h4>
      <div>
        <div className={items}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={items}>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={items}>
          <Button
            variant={"contained"}
            color="primary"
            onClick={() => authHandle()}
          >
            {type == "Login" ? "Login" : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UserManage;
