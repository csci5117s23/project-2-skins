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
    TextField,
    Tooltip, 
    Typography 
} from '@mui/material';
// MUI Icons
import AddIcon from '@mui/icons-material/Add';

export default function AddTagDialog() {
  
  // --------------------------------------------------------------------
  // --- Form popup -----------------------------------------------------
  // State hook to keep track of whether or not add tag popup should show
  const [open, setOpen] = React.useState(false);

  // Function to open popup
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function to close popup
  const handleClose = () => {
    setOpen(false);
  };
  // --------------------------------------------------------------------
  // --------------------------------------------------------------------

  // S

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
        <DialogTitle
        >Add tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tags created here will be added to your list of personal tags.
          </DialogContentText>

            {/* List of user tag inputs */}
            <Autocomplete
              multiple
              options={[]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  fullWidth
                  variant="outlined"
                  label="Type 'enter' to confirm a tag"
                  placeholder="Press 'enter' to confirm a tag"
                  sx={{
                    mt: 2
                  }}
                />
              )}
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