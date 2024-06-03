import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../slices/userDataSlice";
import { API_URL } from "../../apiConfig.js"; // Import the API URL

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { IconButton } from "@mui/material";

const LikeButton = ({ postId, alreadyLiked, numberOfLikes }) => {
  const token = useSelector(selectToken);
  const [liked, setLiked] = useState(alreadyLiked);
  const [totalLikes, setTotalLikes] = useState(numberOfLikes);
  console.log("Post ", postId, "liked", alreadyLiked, liked);
  const handleLikeClick = () => {
    // Toggle the liked state
    setLiked(!liked);
    likeUnlikeApi({ id: postId });
  };
  const likeUnlikeApi = async (data) => {
    try {
      //   if (mode === "update") data.id = modalState.data._id;
      console.log("send liked", liked);
      let postData = await fetch(
        `${API_URL}/users/posts/${liked ? "unlike" : "like"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      let response = await postData.json();
      //   setLoading(false);
      //   console.log(response);
      if (response) {
        console.log(response);
        if (response.message.includes("unliked")) {
          setTotalLikes((prevCount) => prevCount - 1);
        } else {
          setTotalLikes((prevCount) => prevCount + 1);
        }
        // if (response.error)
        //   setErrorMsg({ errorText: response.error, errorType: "error" });
        // else {
        //   setErrorMsg({ errorText: response.message });
        // }
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      setLiked(!liked);
      //   setErrorMsg({ errorText: err.message, errorType: "error" });
      //   setLoading(false);
    }
  };

  useEffect(() => {
    setLiked(alreadyLiked);
  }, [alreadyLiked]);

  return (
    <Badge color="secondary" badgeContent={totalLikes}>
      <IconButton color="error" onClick={handleLikeClick}>
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Badge>
  );
};

export default LikeButton;
