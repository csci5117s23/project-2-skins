import * as React from "react";
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
  Typography,
} from "@mui/material";
// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import AddTagAutocomplete from "./AddTagAutocomplete";

export default function AddTagDialog() {

  // --- Form popup state hooks & functions ------------------------------
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

  return (
    <div>
      {/* Add tag button */}
      <Tooltip title="Add a tag">
        <Button variant="contained" onClick={handleClickOpen}>
          <AddIcon />
        </Button>
      </Tooltip>

      {/* Add tag popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tags created here will be added to your list of personal tags.
          </DialogContentText>
          <AddTagAutocomplete />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}