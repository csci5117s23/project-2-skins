import * as React from 'react';
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
} from '@mui/material';
// MUI Icons imports
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DualCamera from './DualCamera';
import CloseIcon from '@mui/icons-material/Close';

// React webcam import
import Webcam from "react-webcam";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WebcamDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Take photo (from camera) */}
      <Tooltip title="Take a photo">
        <IconButton 
            color="primary" 
            aria-label="upload webcam photo" 
            component="label" 
            onClick={handleClickOpen}
        >
          <PhotoCamera />
        </IconButton>
      </Tooltip>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Take a photo
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
            <Webcam />
        </Box>
      </Dialog>
    </div>
  );
}