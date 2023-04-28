import React, { useCallback, useState, useRef } from "react";
import Webcam from "react-webcam";
// Mui component imports
import { 
    Box, 
    Button, 
    IconButton, 
    Snackbar, 
    Tooltip
} from "@mui/material";
// MUI Icon Imports
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ImageSnackbar from "./ImageSnackbar";
import CloseIcon from "@mui/icons-material/Close";

export default function DualCamera() {
    // --- Camera-related hooks & functions --------------------------------------
    // For setting up camera capture, settings, and which camera to choose
    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);
    const [camera, setCamera] = useState(false);
    let videoConstraints;

    // Use front camera of device if exists
    const frontCamera = useCallback(() => {
        setCamera(false)
    }, [setCamera]);

    // Use rear camera of device if it exists
    const rearCamera = useCallback(() => {
        setCamera(true)
    }, [setCamera]);


    function switchCamera(useRearCamera) {
        userCallback( () =>{
            setCamera(useRearCamera);
        }, [setCamera])
    }

    // Capture image function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    // Set custom dimensions for front-facing & back-facing cameras
    if (camera == true) {           // rear camera
        videoConstraints = {
            width: screen.width,
            height: screen.height - 250,
            facingMode: "environment",
          };    
    } else {                        // front camera
        videoConstraints = {
            width: screen.width,
            height: screen.height - 250,
            facingMode: "user",
          };
    }


    // --- Snackbar-related hooks & functions ------------------------------------
    const [snackbarProps,  setSnackbarProps] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center",
      });
      const { vertical, horizontal, open } = snackbarProps;
    
      // Handle photo capture button clicked
      const handleClick = (newSnackbarProps) => () => {
        setSnackbarProps({ open: true, ...newSnackbarProps });
      };
    
      // Handle  closing snackbar
      const handleClose = () => {
        setSnackbarProps({ ...snackbarProps, open: false });
      };
      
      // For making snackbar transition up on popup
      function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }

    return (
        <Box>
            {/* Webcam box */}
            <Box className="Webcam">
                {/* Show webcam when user is trying to take photo */}
                <Box id="webcam-container">
                    {!img && 
                        <Webcam 
                            mirrored={false}
                            videoConstraints={videoConstraints}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    }
                </Box>
                {/* Show user-captured photo when they click 'Capture photo' button */}
                <Box id="photo-capture-container">
                    {img && ( <img src={img} alt="captured-photo"/> )}
                </Box>
            </Box>

            {/* Buttons for switching camera, taking photo, etc. */}
            <Box>
                <Tooltip title="Switch camera">
                    {camera ? ( // If true, show front camera
                        <IconButton onClick={frontCamera}>
                            <CameraswitchIcon/>
                        </IconButton>
                    ) : ( // Othewise show back camera
                        <IconButton onClick={rearCamera}>
                            <CameraswitchIcon/>
                        </IconButton>
                    )}
                </Tooltip>
                
                {/* Capture photo button w/ associated snackbar onclick to notify users */}
                <Button 
                    variant="contained" 
                    onClick={ () => {
                        capture(); 
                        handleClick({
                            vertical: "bottom",
                            horizontal: "center",
                        })
                    }}>
                    Capture photo
                </Button> 
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="Photo captured"
                    key={vertical + horizontal}
                    TransitionComponent={TransitionUp}
                    action={
                    <React.Fragment>
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                        >
                        <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                    }
                />

            </Box>
        </Box>
    );
}