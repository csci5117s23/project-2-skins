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

export default function AddTagAutocomplete() {
  // State hooks for user tags
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const handleChange = (event, value) => setSelectedOptions(value);

  const handleChange2 = (event, value) => {
    console.log("handleChange2: " + value);
  };

  const handleSubmit = () => console.log(selectedOptions);

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
        onChange={handleChange2}
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
            onChange={(event, value) => console.log("textfield on change: " + value)} // prints the selected value
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
