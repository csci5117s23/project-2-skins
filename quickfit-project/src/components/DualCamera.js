import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";
// Mui component imports
import { 
    Box, 
    IconButton 
} from "@mui/material";
// MUI Icon Imports
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';


export default function DualCamera() {

    // For specifying video dimensions
    let videoConstraints;

    // Keep track of which camerae side to show
    const [camera, setCamera] = useState(false);

    // Use front camera of device i
    const frontCamera = useCallback(() => {
        setCamera(false)
    }, [setCamera]);

    // Use rear camera of device if it exists
    const backCamera = useCallback(() => {
        setCamera(true)
    }, [setCamera]);

    // Set custom dimensions for front-facing & back-facing cameras
    if (camera == true) {
        videoConstraints = {
            width: screen.width,
            // height: screen.height - 200,
            facingMode: "environment",
          };    
    } else {
        videoConstraints = {
            width: screen.width,
            // height: screen.height - 200,
            facingMode: "user",
          };
    }

    return (
        <Box>
            {/* Webcam box */}
            <Box className="Webcam">
                <Webcam 
                    mirrored={false}
                    videoConstraints={videoConstraints}
                />
            </Box>
            {/* Switch camera buttons box */}
            <Box>
                {camera ? ( // If true, show front camera
                    <IconButton onClick={frontCamera}>
                        Front Camera <CameraswitchIcon/>
                    </IconButton>
                ) : ( // Othewise show back camera
                    <IconButton onClick={backCamera}>
                        Back Camera  <CameraswitchIcon/>
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}