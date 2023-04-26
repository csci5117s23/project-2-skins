import * as React from "react";
// MUI Component Imports
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

export default function AddTagAutocomplete( {setAutocompleteTags} ) {

  return (
    <div>
      {/* List of user tag inputs */}
      <Autocomplete
        multiple
        autoHighlight
        freeSolo
        id="tags-outlined"
        options={[]}
        getOptionLabel={(option) => option.title}
        onChange={setAutocompleteTags}
        filterSelectedOptions
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
              variant="outlined"
              label="Press 'enter' to confirm a tag"
              sx={{
                  mt: 2,
              }}
            />
        )}
        />
    </div>
  );
}
