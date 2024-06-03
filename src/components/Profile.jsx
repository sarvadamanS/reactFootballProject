import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, selectToken } from "../slices/userDataSlice";
import ErrorAlert from "./UI/ErrorAlert";

import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/AddAPhoto";
import ImageSelect from "./UI/ImageSelect";
import { API_URL } from "../apiConfig"; // Import the API URL

let profileTags = [
  "Name",
  "Favorite Club",
  "Favorite Player",
  "Jersey Number",
  "Started Following",
];
const Profile = () => {
  const token = useSelector(selectToken);
  const curProfilePic = useSelector((state) => state?.userData?.profilePic);
  // console.log(curProfilePic);
  let [editMode, setEditMode] = useState(false);
  let [imgSelectMode, setImgSelectMode] = useState(false);
  let [userData, setUserData] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    errorText: null,
    errorType: null,
  });

  const fetchProfileApi = async () => {
    try {
      let callData = await fetch(`${API_URL}/users/get-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      let response = await callData.json();
      if (response)
        setUserData({
          userName: response.userName,
          favoriteClub: response.favoriteClub,
          favoritePlayer: response.favoritePlayer,
          jerseyNumber: response.jerseyNumber,
          startedFollowing: response.startedFollowing.split("T")[0],
        });
      console.log(response);
      if (response.error) {
        setErrorMsg({ errorText: response.error, errorType: "error" });
      } else {
        setErrorMsg({ errorText: response.message });
      }
    } catch (err) {
      console.log("Error", err);
      setErrorMsg({ errorText: err.message });
    }
  };
  const updateProfileApi = async (dataToSend) => {
    try {
      let callData = await fetch(`${API_URL}/users/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      let response = await callData.json();
      console.log(response);
      if (response.error) {
        setErrorMsg({ errorText: response.error, errorType: "error" });
        setEditMode(true);
      } else {
        setErrorMsg({ errorText: response.message });
      }
    } catch (err) {
      console.log("Error", err);
      setErrorMsg({ errorText: err.message });
      setEditMode(true);
    }
  };

  useEffect(() => {
    fetchProfileApi();
  }, []);
  let keysArray = Object.keys(userData);
  // console.log(Object.keys(userData), Object.values(userData));
  const editHandler = (e) => {
    e.preventDefault();
    let curMode = !editMode;
    setEditMode(curMode);
    setErrorMsg({ errorText: null, errorType: null });
    if (!curMode) {
      updateProfileApi(userData);
    }
    // hide edit button
  };
  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.id]: inputValue,
    }));
  };
  const openImgSelectHandler = () => {
    setImgSelectMode(true);
  };
  const closeImgSelectHandler = () => {
    setImgSelectMode(false);
  };
  return (
    <>
      <ImageSelect
        openDialog={imgSelectMode}
        closeDialog={closeImgSelectHandler}
      ></ImageSelect>

      <Container maxWidth="lg">
        <Card sx={{ maxWidth: "lg", my: 2, mx: "auto" }}>
          <CardContent>
            <Grid
              container
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Grid item xs={4}>
                <Avatar
                  alt="Sarva"
                  src={`/Avatars/tile${curProfilePic.id ?? "000"}.jpg`}
                  sx={{ width: "70%", height: "auto", margin: "auto" }}
                />
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={openImgSelectHandler}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <form onSubmit={editHandler}>
                  <Table>
                    <TableBody>
                      {keysArray.map((el, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            backgroundColor: "#ede5ff",
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#e1d4ff",
                            },
                            "&:hover": {
                              color: "red",
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {profileTags[i]}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {el === "startedFollowing" ? (
                              <input
                                type="date"
                                id={el}
                                value={userData[el]}
                                disabled={!editMode}
                                onChange={onChangeHandler}
                              />
                            ) : (
                              <TextField
                                id={el}
                                // variant="standard"
                                value={userData[el]}
                                disabled={!editMode}
                                onChange={onChangeHandler}
                                required
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      {editMode ? (
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<UpgradeIcon />}
                          sx={{ m: "1rem" }}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          sx={{ m: "1rem" }}
                          onClick={editHandler}
                        >
                          Edit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              {errorMsg ? <ErrorAlert errorMessage={errorMsg} /> : ""}
            </Grid>
          </CardContent>
          <CardActions>
            <Typography variant="subtitle2" gutterBottom>
              <a href="https://www.freepik.com/free-vector/pack-people-avatars_7085146.htm#query=avatar&position=33&from_view=keyword&track=sph&uuid=be6bcb01-dd3e-487b-a548-1bceecfbee98">
                Avatar Images by pikisuperstar
              </a>{" "}
              on Freepik
            </Typography>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
export default Profile;
