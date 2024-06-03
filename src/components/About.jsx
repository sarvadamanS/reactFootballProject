import { useTheme } from "@mui/material/styles";
import React from "react";
import Container from "@mui/material/Container";
import { API_URL } from "../apiConfig"; // Import the API URL

const About = () => {
  const [data, setData] = React.useState(null);
  const callApi = async () => {
    try {
      let response = await fetch(`${API_URL}/api?user=garima&gender=female`);
      let dataApi = await response.json();
      setData(dataApi.message);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    callApi();
  }, []);
  return (
    <>
      <Container maxWidth="lg">
        <p>About</p>
        <p>{!data ? "Loading..." : data}</p>
      </Container>
    </>
  );
};
export default About;
