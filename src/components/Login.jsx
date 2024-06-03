import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { login, setToken } from "../slices/userDataSlice";
import ErrorAlert from "./UI/ErrorAlert";

import { Card, Dialog, Typography, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../apiConfig"; // Import the API URL

const Login = () => {
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      // getUserInfo();
      fetchLoginApi({ googleAccessToken: codeResponse.access_token }, "google");
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useSelector((state) => state?.userData);
  let [redirectPage, setRedirectPage] = useState(null);
  const [errorMsg, setErrorMsg] = useState({
    errorText: null,
    errorType: null,
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    // Access formData.username and formData.password for form submission
    fetchLoginApi({ userName: formData.username, password: formData.password });

    // You can perform form submission logic here
  };
  const fetchLoginApi = async (credentials, mode = null) => {
    try {
      let curMode = mode;
      let callData = await fetch(
        `${API_URL}/login${curMode ? "?mode=google" : ""}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer usertokensarva",
          },
          body: JSON.stringify(credentials),
        }
      );
      let dataApi = await callData.json();
      console.log(dataApi);
      if (dataApi.error)
        setErrorMsg({ errorText: dataApi.message, errorType: "error" });

      if (dataApi.token) {
        dispatch(setToken(dataApi.token));
        dispatch(login());
        setErrorMsg({ errorText: dataApi.message, errorType: "success" });
        if (redirectPage) {
          navigate("/" + redirectPage);
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      console.log(err);
      setErrorMsg({ errorText: err.message, errorType: "error" });
    }
  };
  // const getUserInfo = async (accessToken) => {
  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     console.log(response);
  //     if (response.ok) {
  //       const userInfo = await response.json();
  //       console.log("User info:", userInfo);
  //       fetchLoginApi({ userName: userInfo.email }, "google");
  //       // Here you can extract user email, name, and other details from userInfo
  //     } else {
  //       console.error("Failed to fetch user info:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // };

  let loggedIn = userState.isloggedIn;
  if (loggedIn)
    return (
      <>
        <Typography align="center" variant="h5" sx={{ m: 8, p: 8 }}>
          You are logged in
        </Typography>
        <ErrorAlert errorMessage={errorMsg} />
      </>
    );
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // Get the value of the 'redirect' query parameter
    const redirect = queryParams.get("redirect");
    setRedirectPage(redirect);
  }, [location]);
  return (
    <>
      <Card
        sx={{ width: { xs: "80%", lg: 1 / 2 }, m: "auto", mt: 2 }}
        onSubmit={loginSubmitHandler}
      >
        <Paper
          sx={{
            backgroundImage: 'url("/white-concrete-wall.jpg")',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Login in to your account
          </Typography>
          <CardContent sx={{}}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
              action="./home"
            >
              <TextField
                id="username"
                label="Email/Username"
                variant="outlined"
                autoComplete="true"
                fullWidth={true}
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                autoComplete="true"
                fullWidth={true}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {/* <input type="submit" value="Submit"></input> */}
              <CardActions>
                <Button type="submit" value="Submit" variant="outlined">
                  Login
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Paper>
      </Card>
      <GoogleLogin></GoogleLogin>
      <Button onClick={loginGoogle}> Google login</Button>
      {errorMsg ? <ErrorAlert errorMessage={errorMsg} /> : ""}
    </>
  );
};
export default Login;
