import React from "react";
import { Alert } from "@mui/material";
const ErrorAlert = (props) => {
  return (
    <>
      {props.errorMessage.errorText ? (
        <Alert
          severity={props.errorMessage.errorType ?? "success"}
          sx={{
            width: { xs: 4.5 / 5, sm: "auto" },
            mt: 2,
            mx: "auto",
          }}
        >
          {props.errorMessage.errorText}
        </Alert>
      ) : (
        " "
      )}
    </>
  );
};
export default ErrorAlert;
