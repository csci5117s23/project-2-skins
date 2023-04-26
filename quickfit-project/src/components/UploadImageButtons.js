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
import PhotoCamera from '@mui/icons-material/PhotoCamera';


export default function PhotoButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      
      {/* Upload photo */}
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      
      {/* Take photo (from camera) */}
      <Tooltip title="Take a photo">
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </Tooltip>

    </Stack>
  );
}