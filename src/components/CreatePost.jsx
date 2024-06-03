import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../slices/userDataSlice";
import { convertDate } from "../helpers";
import ErrorAlert from "./UI/ErrorAlert";
import { API_URL } from "../apiConfig.js"; // Import the API URL
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Container,
  Typography,
  Button,
  Card,
  Modal,
  Box,
  TextField,
  CircularProgress,
  IconButton,
  List,
  ListItemText,
  ListItem,
  Grid,
  Chip,
  Avatar,
  ListItemAvatar,
  Alert,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ScheduleIcon from "@mui/icons-material/Schedule";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 4 / 5, sm: 1 / 2 },
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 3,
  maxHeight: "95%",
  overflowY: "auto",
};
let emptyFormObj = {
  title: "",
  subtitle: "",
  fixture: "",
  picture: "",
  body: "",
};

const CreatePost = () => {
  const token = useSelector(selectToken);
  const [modalState, setModalState] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const [errorMsg, setErrorMsg] = useState({
    errorText: null,
    errorType: null,
  });

  const handleOpen = (mode, data) => {
    console.log(mode, data);
    if (mode === "update") {
      setFormData({
        title: data.title,
        subtitle: data.subtitle,
        fixture: data.fixture,
        picture: data.picture,
        body: data.body,
      });
    }
    setModalState({ open: true, mode: mode, data: data });
    setErrorMsg({
      errorText: null,
      errorType: null,
    });
  };
  const handleClose = () => {
    setFormData(emptyFormObj);
    setModalState((prevModalData) => ({
      ...prevModalData,
      open: false,
      data: null,
    }));
  };

  const [formData, setFormData] = useState(emptyFormObj);

  const handleFormChange = (e, editor) => {
    if (!e.target) {
      console.log(editor);
      const bodyText = editor.getData();
      console.log(bodyText);
      setFormData((prevFormData) => ({
        ...prevFormData,
        body: bodyText,
      }));
      return;
    }
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    setLoading(true);
    createPostApi(formData, modalState.mode);
  };

  const createPostApi = async (data, mode) => {
    try {
      if (mode === "update") data.id = modalState.data._id;
      let postData = await fetch(`${API_URL}/users/${mode}-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });
      let response = await postData.json();
      setLoading(false);
      if (response) {
        console.log(response);
        if (response.error)
          setErrorMsg({ errorText: response.error, errorType: "error" });
        else {
          setErrorMsg({ errorText: response.message });
        }
      }
    } catch (err) {
      console.log(err.message);
      setErrorMsg({ errorText: err.message, errorType: "error" });
      setLoading(false);
    }
  };

  const fetchPostApi = async () => {
    try {
      let callData = await fetch(`${API_URL}/get-posts`, {
        method: "GET",
      });
      let data = await callData.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setPostData(data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    fetchPostApi();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Card sx={{ maxWidth: "lg", my: 2, mx: "auto", p: 2 }}>
          <Button
            variant="outlined"
            sx={{ ml: "50%" }}
            onClick={() => handleOpen("create")}
          >
            Create post
          </Button>
          <List>
            {postData?.map((post, i) => (
              <ListItem
                sx={{ border: 1, my: 2, mx: "auto" }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleOpen("update", post)}
                  >
                    <EditIcon />
                  </IconButton>
                }
                key={i}
              >
                <ListItemAvatar>
                  <Avatar>
                    <TextSnippetIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={post.title} secondary={post.subtitle} />
                <Chip
                  icon={<ScheduleIcon />}
                  label={convertDate(post.createdAt)}
                  color="secondary"
                  ariant="outlined"
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Container>
      <Modal
        open={modalState.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton sx={{ mr: 0 }} aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalState?.mode[0].toUpperCase() + modalState?.mode.slice(1)} Post
          </Typography>

          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleFormChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="subtitle"
              label="Subtitle"
              value={formData.subtitle}
              onChange={handleFormChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="fixture"
              label="Fixture"
              value={formData.fixture}
              onChange={handleFormChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="picture"
              label="Picture"
              value={formData.picture}
              onChange={handleFormChange}
              margin="normal"
            />
            {/* <TextField
              fullWidth
              name="body"
              label="Body"
              multiline
              rows={4}
              value={formData.body}
              onChange={handleFormChange}
              margin="normal"
              required
            /> */}
            <CKEditor
              editor={ClassicEditor}
              onChange={handleFormChange}
              data={formData.body}
            />
            <Grid container columnSpacing={0} columns={16} sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {modalState.mode === "update" ? "Update" : "Submit"}
                </Button>
              </Grid>
              <Grid item xs={1}>
                {" "}
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "primary.main",
                    }}
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={11}>
                {errorMsg ? <ErrorAlert errorMessage={errorMsg} /> : ""}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default CreatePost;
