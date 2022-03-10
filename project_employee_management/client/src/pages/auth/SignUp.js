import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function SignIn({ isLoggedIn, changeLoginIsTrue }) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassWord(event.target.value);
  };

  const login = async () => {
    try {
      axios
        .post(
          "http://localhost:8080/api/auth/login",
          {
            userName,
            passWord,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.auth) {
            changeLoginIsTrue(true);
          }
        });
    } catch (error) {}
  };

  return (
    <Container sx={{ w: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "200px", margin: "auto", paddingTop: "200px" }}>
        <h2 sx={{ display: "block" }}>Sign Up</h2>
        <TextField
          onChange={handleChangeUserName}
          autoFocus
          margin="dense"
          id="userName"
          label="User Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={handleChangePassword}
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
        <Button variant="text" onClick={login}>
          Sign
        </Button>
        {isLoggedIn ? <Redirect to="/home" /> : null}
      </Box>
      <Box sx={{ width: "200px", margin: "auto", paddingTop: "200px" }}>
        <h2 sx={{ display: "block" }}>Login</h2>
        <TextField
          onChange={handleChangeUserName}
          autoFocus
          margin="dense"
          id="userName"
          label="User Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={handleChangePassword}
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
        <Button variant="text" onClick={login}>
          Sign In
        </Button>
        {isLoggedIn ? <Redirect to="/home" /> : null}
      </Box>
    </Container>
  );
}