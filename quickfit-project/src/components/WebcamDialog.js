import * as React from "react";
// MUI Component Imports
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
// MUI Icons imports
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CancelIcon from '@mui/icons-material/Cancel';
// Custom component imports
import DualCamera from "./DualCamera";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WebcamDialog( { image, setImage, setFileUploadText } ) {
  // State of whether or not dialog is open
  const [open, setOpen] = React.useState(false);

  // Function to open up webcam dialog/popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close webcam dialog/popup
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      {/* Take photo icon button */}
      <Tooltip title="Take a photo">
        <Button
          variant="outlined"
          aria-label="upload webcam photo"
          component="label"
          sx={{ width: 150, color:"#3C3F42", borderColor:"#3C3F42" }}
          onClick={handleClickOpen}
          endIcon={<PhotoCamera/>}
        >
          Use camera
        </Button>
      </Tooltip>

      {/* Popup that shows when user clicks camera button */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{ mb: -1 }}
      >
        {/* Top header of form popup */}
        <AppBar
          sx={{ position: "absolute", }}
        >
          <Toolbar>
            {/* Popup header text */}
            <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
              Take a photo
            </Typography>
            
            {/* Close open dialog button */}
            <Tooltip title="Go back">
              <IconButton onClick={ () => { handleCloseDialog(); } }>
                  <CancelIcon/>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Camera container */}
        <DualCamera handleCloseDialog={handleCloseDialog} image={image} setImage={setImage} setFileUploadText={setFileUploadText} />
      </Dialog>
    </>
  );
}
