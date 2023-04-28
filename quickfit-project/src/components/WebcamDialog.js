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
import ImageSnackbar from './ImageSnackbar';

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
      {/* Take photo icon button */}
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

    {  /* Popup that shows when user clicks camera button */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* Top header of form popup */}
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                {/* Popup header text */}
                <Typography sx={{ ml: 0.5, flex: 1 }} variant="h6" component="div">
                Take a photo
                </Typography>

                {/* Close button */}
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

        {/* Camera container */}
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <DualCamera />
        </Box>
      </Dialog>
    </div>
  );
}