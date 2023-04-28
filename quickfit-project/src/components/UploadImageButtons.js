import * as React from 'react';
// MUI Imports
import { 
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip, 
  Typography 
} from '@mui/material';
// MUI Icons

// Camera-imports
import WebcamDialog from './WebcamDialog';


export default function PhotoButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      
      {/* Upload photo */}
      <Tooltip title="Upload a photo">
        <Button variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Tooltip>
      
      {/* Take photo (from camera) */}
      <WebcamDialog/>

    </Stack>
  );
}