import * as React from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Imports
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
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

export default function AddTagAutoComboBox( { userTags, setTagList, getTags, addTag, editTag, deleteTag } ) {
  // Get list of user tags' names
  const tagNames = userTags.map( (tag) => { return ( tag.name ) });
  const tagIds = userTags.map( (tag) => { return ( tag._id ) });

  return (
    <div>
      {/* List of user tag inputs */}
      <Autocomplete
        multiple
        autoHighlight
        freeSolo
        options={ userTags }
        // value={tagIds}
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
        renderOption={(props, option, state) => (
          // Container for each element/option in pre-existing tags dropdown
          <Container key={option._id} {...props}>
              {option.name} 
            {/* Delete tag button */}
            <Tooltip title="Remove from personal tags">
              <IconButton onClick={ () => { deleteTag(option._id); } }>
                <ClearIcon/>
              </IconButton>
            </Tooltip>     
          </Container>
        )}
        getOptionLabel={ (tag) => tag.name }
        // getOptionSelected={(option, value) => option.name === value.name }
        // renderOption={(props, option, state) => {
        //   console.log(props);
        //   return (
        //     <li {...props}>{`${option.key}`}</li>
        //   );
        // }}
      />
    </div>
  );
}