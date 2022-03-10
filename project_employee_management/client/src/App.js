import React, { useState, useEffect } from "react";
import PublicRoutes from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["sid"]);

  const changeLoginIsTrue = () => {
    setIsLoggedIn(true);
  };
  const changeLoginIsFalse = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/api/auth/verify", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.auth) {
            setIsLoggedIn(res.data.auth);
          } else {
            setIsLoggedIn(false);
            removeCookie("sid");
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          removeCookie("sid");
        });
    } catch (error) {}
  }, []);

  return (
    <Router className="App">
      <PublicRoutes
        removeCookie={removeCookie}
        isLoggedIn={isLoggedIn}
        changeLoginIsTrue={changeLoginIsTrue}
        changeLoginIsFalse={changeLoginIsFalse}
      />
    </Router>
  );
}

export default App;
