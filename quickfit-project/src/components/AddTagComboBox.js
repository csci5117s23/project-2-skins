import * as React from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Imports
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Checkbox,
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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddTagComboBox( {userTags, setInputTags, getTags, addTag, editTag, deleteTag} ) {
  return (
    <Autocomplete
      multiple
      freeSolo
      id="checkboxes-tags"
      options={userTags}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name || option}  // || statement for user freeSolo inputs
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Checkboxes" />
      )}
      onChange={ (event, value) => { setInputTags(value); console.log("Value: " + value); } }
    />
  );
}