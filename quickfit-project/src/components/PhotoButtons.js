import * as React from "react";
// MUI Imports
import {
  Autocomplete,
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
import ImageUploadForm from "./ImageUploadForm";

export default function PhotoButtons( { image, setImage }) {
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
            endIcon={<DriveFolderUploadRoundedIcon />}
          >
            Upload
            <input 
              hidden 
              accept="image/*" 
              multiple 
              type="file" 
              
            />
          </Button>
        </Tooltip>

        

        {/* Take photo (from camera) */}
        <WebcamDialog image={image} setImage={setImage} />
      </Stack>
      <ImageUploadForm/>
    </>
  );
}
