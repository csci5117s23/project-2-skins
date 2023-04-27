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

export default function AddTagAutoComboBox( { userTags, setTagList, getTags, addTag, editTag, deleteTag } ) {

  return (
    <div>
      {/* List of user tag inputs */}
      <Autocomplete
        multiple
        autoHighlight
        freeSolo
        options={["cat"]}
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
      />
    </div>
  );
}