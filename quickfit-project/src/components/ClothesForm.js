import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import {
  Box,
  Stack,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Button,
  Autocomplete,
  Chip,
  FormLabel,
  Typography,
} from "@mui/material";
// DB Clothes Function imports
import {
  getClothes, 
  addClothes, 
  editClothes, 
  deleteClothes 
} from "../modules/clothesFunctions"


// Header text styling for each form input
function InputHeader( props ) {
  return (
    <Typography variant="h8" 
      sx={{
        fontWeight: 'bold'
      }}>
      {props.children}
    </Typography>
  )
}


// Clothes form
export default function ClothesForm() {
  // Authorization
  const { userId, getToken } = useAuth();

  // Add form inputs
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  
  // TODO: Use these states to hold tag values onChange and onKeypress
  const [newTag, setNewTag] = useState("");
  const [tagList, setTagList] = useState([]);

  // --------------------------------------------------
  // Function to handle adding tag to tags list state
  // ---------------------------------------------------
  


  // --------------------------------------------------
  // Function to add a clothing article from front-end
  // --------------------------------------------------
  async function addClothesFE() {
    // Create a clothing item from state variables to POST
    const clothingItem = {
      category: category,
      name: name,
      color: color,
      tags: tagList,
    }
    console.log(clothingItem);
    // Call POST function
    // addClothes(null, clothingItem);
  }
  
  // JSX
  return (
    <>
      {/* Clothes form container */}
      <Box 
        sx={{
          bgcolor: 'white',
          m: { xs: 0, sm: 1, md: 3, xl: 5 },
          p: { xs: 2, sm: 3, md: 4, xl: 5 },
          height: '100%',
        }}
      >
        
        {/* Form */}
        <FormControl fullWidth>
          <FormLabel 
            sx={{
              textAlign: 'center',
              mt: 1,
              mb: 2,
              py: 1,
              bgcolor: 'lightgrey',
              borderRadius: 4
            }}>
            <Typography variant="h7" 
              sx={{ fontWeight: 'bold' }}
            >
              Add clothes to your wardrobe
            </Typography>
          </FormLabel>
          
          {/* List of form fields */}
          <Stack spacing={1}>

            {/* Category */}
            <InputHeader> Category </InputHeader>
            <TextField select
              label="Choose clothing category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <MenuItem value={"top"}>Top</MenuItem>
              <MenuItem value={"sweater"}>Sweater</MenuItem>
              <MenuItem value={"bottom"}>Bottoms</MenuItem>
              <MenuItem value={"jacket"}>Jacket</MenuItem>
              <MenuItem value={"shoes"}>Shoes</MenuItem>
              <MenuItem value={"accessories"}>Accessories</MenuItem>
              <MenuItem value={"onepiece"}>One Piece</MenuItem>
            </TextField>
          
            {/* Name */}
            <InputHeader> Name </InputHeader>
            <TextField variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {/* Color */}
            <InputHeader> Color </InputHeader>
            <TextField
              variant="outlined"
              label="Color"
              value={color}
              placeholder="Press Enter for more tags"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />

            {/* Tags */}
            <InputHeader> Tags </InputHeader>
            <Autocomplete
              multiple
              options={[]}
              freeSolo
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
                  label="Tags"
                  placeholder="Press Enter for more tags"
                />
              )}
              onChange={}
            />

            {/* Image */}
            <Button variant="contained" component="label">
              Upload Photo
              <input type="file" accept="image/png, image/jpeg" hidden />
            </Button>

            {/* Submit */}
            <Button variant="contained" onClick={ addClothesFE }>
              Submit
            </Button>

          </Stack>
        </FormControl>
      </Box>
    </>
  );
}
