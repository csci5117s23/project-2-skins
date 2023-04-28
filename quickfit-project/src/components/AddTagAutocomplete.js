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

// DB Tag Function imports
import {
    getTags, 
    addTag, 
    editClothes, 
    deleteClothes 
  } from "../modules/clothesFunctions"

// Component for ....
export default function AddTagAutocomplete() {

  // State hooks for new user tags
  const [newTags, setNewTags] = React.useState([]);

  // Function to handle adding a new tag to list of new tags
  const handleNewTag = (event, value) => {
    setNewTags(value);
    console.log(newTags);
  };

  // Function to make post requests for each value list
  const handleAddTags = () => {
    // Make post requests for each value list
    newTags.map();
  };

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
        onChange={handleNewTag}
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
            fullWidth
            sx={{
              mt: 2,
            }}
            onChange={(event, value) =>
              console.log("textfield on change: " + value)
            } // prints the selected value
          />
        )}
      />
    </div>
  );
}

//   {/* List of user tag inputs */}
//   <Autocomplete
//     multiple
//     options={[]}
//     freeSolo
//     renderTags={(value, getTagProps) =>
//       value.map((option, index) => (
//         <Chip
//           variant="outlined"
//           label={option}
//           {...getTagProps({ index })}
//         />
//       ))
//     }
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         variant="outlined"
//         label="Press 'enter' to confirm a tag"
//         sx={{
//           mt: 2,
//         }}
//         onChange={(event, value) => console.log(value)} // prints the selected value
//       />
//     )}
//   />
