import {useState}  from "react";
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

export default function AddTagComboBox( { reset, userTags, setInputTags, getTags, addTag, editTag, deleteTag} ) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { getToken } = useAuth();

  // ------------------------------------------------------------------
  // Function to handle deleting tag from autocomplete select dropdown
  // ------------------------------------------------------------------
  async function handleDelete(tag) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });
    const result = await deleteTag(token, tag)
  }

  // ------------------------------------------------------------------
  // Refresh userTags on each page render
  // ------------------------------------------------------------------

  return (
    
    <Autocomplete
      key={reset}
      multiple
      freeSolo
      id="checkboxes-tags"
      options={userTags || []}
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

          {/* Delete button */}
          <Tooltip title="Delete tag">
            <IconButton onClick={ () => { handleDelete(option); } }>
              <ClearIcon/>
            </IconButton>
          </Tooltip>
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Select Tags" placeholder="Select or add tags." />
      )}
      onChange={ (event, value) => { setInputTags(value); console.log("Value: " + value); } }
    />
  );
}