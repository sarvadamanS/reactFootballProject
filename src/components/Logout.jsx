import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, clearToken } from "../slices/userDataSlice";

import { Typography } from "@mui/material";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(clearToken());
  }, []);
  return (
    <>
      <Typography align="center" variant="h5" sx={{ margin: 8, padding: 8 }}>
        You are logged out
      </Typography>
    </>
  );
};
export default Logout;
