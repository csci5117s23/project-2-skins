import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Add tag button */}
      <Tooltip title="Add a tag">
        <Button 
            variant="contained" 
            onClick={handleClickOpen}
            sx={{
                // mt: '75%'
            }}>
            <AddIcon/>
        </Button>
      </Tooltip>

      {/* Add tag popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tags created here will be added to your list of personal tags.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Type 'enter' to confirm a tag"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}