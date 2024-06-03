import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { updateProfilePic } from "../../slices/userDataSlice.js";
const CreateImgObj = () => {
  let totalImgs = 6;
  let imgsArray = [];
  for (let i = 0; i < totalImgs; i++) {
    imgsArray.push({
      img: `/Avatars/tile00${i + 1}.jpg`,
      title: `tile00${i + 1}`,
      active: i === 1 ? "active" : null,
    });
  }
  return imgsArray;
};
const ImageSelect = (props) => {
  const dispatch = useDispatch();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  let imgData = CreateImgObj();
  const handleClose = () => {
    props.closeDialog();
  };
  const selectImageElementHandler = (index) => {
    // const selectedItem = this.imgData[index];
    setSelectedItemIndex(index);
  };
  const submitProfilePic = () => {
    dispatch(updateProfilePic(`00${selectedItemIndex + 1}`));
    handleClose();
  };
  return (
    <>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Change your Avatar</DialogTitle>
        <DialogContent>
          <ImageList
            sx={{
              width: { xs: "16rem", lg: "28rem" },
              height: { xs: "18rem", lg: "25rem" },
            }}
            cols={3}
            gap={8}
          >
            {imgData.map((item, index) => (
              <ImageListItem
                key={index}
                onClick={() => selectImageElementHandler(index)}
                sx={{
                  border:
                    index === selectedItemIndex ? "2px solid green " : "none",
                }}
                height={"100%"}
                width={"100%"}
              >
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={submitProfilePic} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ImageSelect;
