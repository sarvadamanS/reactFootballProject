import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Badge from "@mui/material/Badge";
import { IconButton, CardActionArea, CardActions } from "@mui/material";
import LikeButton from "./UI/LikeButton";
import { selectToken } from "../slices/userDataSlice";
import { API_URL } from "../apiConfig.js"; // Import the API URL

const Home = () => {
  const theme = useTheme();
  const token = useSelector(selectToken);
  const [postData, setPostData] = useState(null);
  const [userId, setUserId] = useState(null);
  const fetchPostApi = async () => {
    try {
      let callData = await fetch(`${API_URL}/users/get-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      let response = await callData.json();
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response) {
        setPostData(response.data);
        setUserId(response.user);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const checkAlreadyLiked = (likesArray, userId) => {
    // console.log(likesArray, userId);
    let checkIfLiked = likesArray.filter((el) => el.user === userId);
    if (checkIfLiked.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchPostApi();
  }, []);
  if (!postData) {
    return (
      <Typography align="center" variant="h5" sx={{ margin: 8, padding: 8 }}>
        Data not available
      </Typography>
    );
  }
  return (
    <>
      <Container maxWidth="lg">
        {postData.map((post, i) => (
          <Card sx={{ maxWidth: "sm", my: 2, mx: "auto" }} key={i}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="auto"
                image={post.picture || "/football_pitch.jpg"}
                alt="football pitch"
              />
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6" color="text.secondary">
                      {post.subtitle}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container justifyContent="flex-end">
                      <Grid item></Grid>
                      <Chip
                        icon={<ScheduleIcon />}
                        label={post.fixture}
                        color="secondary"
                        display="flex"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}

              <LikeButton
                postId={post._id}
                alreadyLiked={checkAlreadyLiked(post.likes, userId)}
                numberOfLikes={post.likes.length}
              />
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
};
export default Home;
