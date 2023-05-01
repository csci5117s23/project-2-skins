import { useState, useEffect } from "react";

// MUI Component imports
import {
  Box,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
// MUI Icon imports
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";

export default function PhotoUpload({ onSubmit, reset, setImage, setImageFile }) {
    const [fileUploadText, setFileUploadText] = useState("Choose an image...");

    // ----------------------------------------
    // To handle change in uploaded image file
    // ----------------------------------------
    function handleFileOnChange(e) {
        // Check for if a file was provided or not
        if (!e.target.files || e.target.files.length === 0) {
            setFileUploadText(null);
            return;
        }
        // Set image name, preview, and file input
        setFileUploadText(e.target.files[0].name);
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    }

    useEffect(() => {
      setFileUploadText("Choose an image...");
    }, [reset]);

    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Upload photo button */}
        <Tooltip title="Upload a photo">
            <Button
            variant="outlined"
            component="label"
            sx={{ width: 150, color:"#3C3F42", borderColor:"#3C3F42" }}
            endIcon={<DriveFolderUploadRoundedIcon />}
            >
            Upload
            <input
                hidden
                id="imageFile"
                accept="image/*"
                multiple
                type="file"
                onChange={handleFileOnChange}
            />
            </Button>
        </Tooltip>
        {/* Image file name */}
        <Box>{fileUploadText}</Box>
      </Stack>
    );
}