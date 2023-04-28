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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WebcamDialog() {
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
    <div>
      {/* Take photo icon button */}
      <Tooltip title="Take a photo">
        <Button 
            variant="outlined"
            color="secondary"
            aria-label="upload webcam photo" 
            component="label" 
            onClick={handleClickOpen}
            endIcon={<PhotoCamera />}
        >
            Use camera
        </Button>
      </Tooltip>

    {  /* Popup that shows when user clicks camera button */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{ mb: -1}}
      >
        {/* Top header of form popup */}
        <AppBar sx={{ position: 'absolute', textAlign: 'center', height: '4.5vh' }}>
            <Toolbar>
                {/* Popup header text */}
                <Typography sx={{ flex: 1, mb: 2 }} variant="h6" component="div">
                    Take a photo
                </Typography>
            </Toolbar>
        </AppBar>

        {/* Camera container */}
        <DualCamera handleCloseDialog={handleCloseDialog} />
      </Dialog>
    </div>
  );
}