import { useState, useEffect } from "react";
// MUI Imports
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// MUI Icons
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";

// Camera-imports
import WebcamDialog from "./WebcamDialog";

export default function PhotoButtons( { image, setImage }) {
  const [fileUpload, setFileUpload] = useState("Choose an image...");

  function handleFileOnChange(e) {
      setFileUpload(e.target.files[0].name);
  }

  // useEffect(() => {
  //   setFileUpload("Choose an image...");
  // }, [reset]);
    
  return (
    <>
      <CssBaseline />
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Upload photo button */}
        <Tooltip title="Upload a photo">
          <Button
            variant="outlined"
            component="label"
            color="secondary"
            sx={{ width: 150}}
            endIcon={<DriveFolderUploadRoundedIcon />}
          >
            Upload
            <input 
              hidden 
              accept="image/*" 
              multiple 
              type="file" 
              onChange={ (value) => { handleFileOnChange(); setImage(value); }}
            />
          </Button>
        </Tooltip>
        {/* Image file name */}
        <Box>{fileUpload}</Box>
      </Stack>

      {/* Take photo (from camera) */}
      <WebcamDialog image={image} setImage={setImage} />
      
    </>
  );
}
