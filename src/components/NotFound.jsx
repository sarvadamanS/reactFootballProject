import { Container } from "@mui/system";

import { Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          color="primary"
          sx={{ textAlign: "center", mt: "4rem" }}
        >
          404 ❌ page not found 😖
        </Typography>
      </Container>
    </>
  );
};
export default NotFound;
