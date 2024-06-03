import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile.jsx";
import Footer from "./components/UI/Footer.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import NotFound from "./components/NotFound.jsx";
import ResponsiveAppBar from "./components/UI/ResponsiveAppBar";
import CreatePost from "./components/CreatePost.jsx";

import { parseToken } from "./helpers.js";

import { logout } from "./slices/userDataSlice.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const loginData = useSelector((state) => state?.userData?.isloggedIn);
  let token = sessionStorage.getItem("token");
  console.log(loginData);
  useEffect(() => {
    if (!token) {
      dispatch(logout());
      setUserRole(null);
    } else {
      console.log("token is", token);
      setUserRole(parseToken(sessionStorage.getItem("token")));
    }
  }, [userRole, token]);

  return (
    <>
      <CssBaseline enableColorScheme />
      <div className="content-container">
        <BrowserRouter>
          <ResponsiveAppBar role={userRole}></ResponsiveAppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            {userRole !== null && (
              <Route
                path="/create-post"
                element={
                  userRole === "admin" ? (
                    <CreatePost />
                  ) : (
                    <Navigate to="/login?redirect=create-post" />
                  )
                }
              />
            )}
            <Route
              path="/profile"
              element={
                loginData ? (
                  <Profile />
                ) : (
                  <Navigate to="/login?redirect=profile" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            {/* This Route will match any undefined routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
