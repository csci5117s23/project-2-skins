import * as React from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Imports
import {
  Autocomplete,
  Box,
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
import ClearIcon from '@mui/icons-material/Clear';

// Container for each element/option in pre-existing tags dropdown
function TagDropdownOption( props ) {
  return (
    <Box>
      {props.children}
      
      {/* Delete tag button */}
      <Tooltip title="Add a tag">
        <IconButton><ClearIcon/></IconButton>
      </Tooltip>
    </Box>
  )
}

export default function AddTagAutoComboBox( { userTags, setTagList, getTags, addTag, editTag, deleteTag } ) {
  // Get list of user tags' names
  const tags = userTags.map( (tag) => { return ( tag.name ) });
  
  return (
    <div>
      {/* List of user tag inputs */}
      <Autocomplete
        multiple
        autoHighlight
        freeSolo
        options={tags}
        onChange={ (event, value) => {setTagList(value); console.log(value);} }
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select or enter a new tag."
          />
        )}
        renderOption={(props, option) => (
          <TagDropdownOption {...props}>{option} </TagDropdownOption>
        )}
      />
    </div>
  );
}