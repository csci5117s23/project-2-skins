import * as React from "react";
import { useAuth } from "@clerk/nextjs";
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

// Custom component imports
import AddTagAutocomplete from "./AddTagAutocomplete";


export default function AddTagDialog( {getTags, addTag, editTag, deleteTag } ) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // --- Form popup state hooks & functions ------------------------------
  // State hook to keep track of whether or not add tag popup should show
  const [open, setOpen] = React.useState(false);

  // --- Function to open popup ---
  const handleClickOpen = () => {
    setOpen(true);
  };
  // --- Function to close popup ---
  const handleClose = () => {
    setOpen(false);
  };

  // --- User tag state hooks & functions  -------------------------------
  const [newTags, setNewTags] = React.useState([]);
  
  // -------------------------------------------------------------------------
  // Function to take user input and build newTags from Autocomplete component
  // ------------------------------------------------------------------------- 
  const setAutocompleteTags = (event, value) => {
    setNewTags(value); 
    console.log("Beep: " + newTags);
  };

  // --------------------------------------------------------------------
  // Function to send POST requests to add to a user's personal tags
  // --------------------------------------------------------------------
  async function addAllTags() {
    // If new tags list is empty, tell user to add more tags
    if (newTags === null || newTags.length === 0) {
      console.log("No tags entered.");
      return;
    }
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Map over each new tag in list of new tags and make a post request to create each
    newTags.map((tag) => { 
      // If tag name is null/empty, don't add tag.
      if (tag.name === null || tag.name === "") {
        console.log("Error. Tag name invalid.");
        return;
      }
      addTag(token, tag); // Otherwise, add tag normally.
    })
  }


  // --------------------------------------------------------------------
  // Run on every render.
  // --------------------------------------------------------------------
  React.useEffect(() => {
    console.log("Middle rendered");
  });

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
          <AddTagAutocomplete setAutocompleteTags={setAutocompleteTags} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ () => {handleClose(); addAllTags(); }  }>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}