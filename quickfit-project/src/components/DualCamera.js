// DualCamera.js 
// Some camera code inspired from BookTok projects' tech share  on React camera
import React, { useCallback, useState, useRef } from "react";
import Webcam from "react-webcam";
// Mui component imports
import { 
    Box, 
    Button, 
    Grid, 
    IconButton, 
    Paper, 
    Slide, 
    Snackbar, 
    Tooltip
} from "@mui/material";
// MUI Icon Imports
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DualCamera( { handleCloseDialog, image, setImage, } ) {
    // --- Camera-related hooks & functions --------------------------------------
    // For setting up camera capture, settings, and which camera to choose
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

    // Capture image function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    // Set custom dimensions for front-facing & back-facing cameras
    if (camera === false) {          // front camera
        videoConstraints = {
            width: screen.width,
            height: screen.height,
            facingMode: "user",
        };
    } else {                        // rear camera
        videoConstraints = {
            width: screen.width,
            height: screen.height,
            facingMode: "environment",
        }; 
    }

    return (
        <Box sx={{ m: 0, p: 0 }}>
            {/* Webcam box */}
            <Box className="Webcam">
                {/* Show webcam when user is trying to take photo */}
                <Box id="webcam-container">
                    {!image && 
                        <Webcam 
                            mirrored={false}
                            videoConstraints={videoConstraints}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    }
                </Box>
                {/* Show user-captured photo when they click "Capture photo" button */}
                <Box id="photo-capture-container">
                    {image && ( <img src={image} alt="captured-photo"/> )}
                </Box>
            </Box>

            {/* Buttons for switching camera, taking photo, etc. */}
            <Grid
                container
                direction="row"
                // alignItems="center"
                justifyContent={"center"}
                spacing={6}
                sx={{
                    position: 'fixed', 
                    bottom: '0',
                    pb: 3
                }}
            > 
                {/* Grid item 1 */}
                <Grid item>
                    {/* Switch camera button */}
                    <Tooltip title="Switch camera">
                        {camera ? ( // If true, show front camera
                            <IconButton 
                                color="primary"
                                onClick={frontCamera} 
                            >
                                <CameraswitchIcon/>
                            </IconButton>
                        ) : ( // Othewise show back camera
                            <IconButton 
                                color="primary"
                                onClick={rearCamera} 
                            >
                                <CameraswitchIcon/>
                            </IconButton>
                        )}
                    </Tooltip>
                </Grid>
                {/* Grid item 2 */}
                <Grid item>
                    {/* Capture photo button w/ associated snackbar onclick to notify users */}
                    {!image &&
                        <Button 
                            variant="contained" 
                            onClick={ () => { capture() }}
                            endIcon={<PhotoCameraIcon/>}
                        >
                            Take photo
                        </Button>
                    }
                    {/* If a photo has already been taken, show this button to start up the webcam again */}
                    {image &&
                        <Button 
                            variant="contained" 
                            onClick={ () => {
                                setImage(null);
                            }}
                            endIcon={<PhotoCameraIcon/>}
                        >
                            Retake photo
                        </Button>
                    }
                </Grid>
                {/* Grid item 3 */}
                <Grid item>
                    {/* Switch camera button */}
                        {(image == null) ? ( // User still hasn't taken a photo
                            <Tooltip title="No photo taken">
                                <IconButton color="error">
                                    <CheckCircleOutlineIcon/>
                                </IconButton>
                            </Tooltip>
                        ) : ( // Otherwise, a photo has been taken
                            <Tooltip title="Confirm photo">
                            <IconButton color="success" 
                                onClick={ () => {
                                    setImage(image);
                                    handleCloseDialog();
                                }}
                            >
                                <CheckCircleIcon/>
                            </IconButton>
                            </Tooltip>
                        )}
                </Grid>
            </Grid> 
        </Box>
    );
}