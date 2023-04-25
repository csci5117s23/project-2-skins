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
  const { userId, getToken } = useAuth();
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  
  // TODO: Use these states to hold tag values onChange and onKeypress
  const [newTag, setNewTag] = useState("");
  const [tagList, setTagList] = useState([]);

  async function addClothes() {
    const clothingItem = {
      category: category,
      name: name,
      color: color,
      tags: [tags],
    }


    const token = await getToken({ template: "codehooks" });

    // if category or name is empty, dont post
    if (category === "" || name === "") {
      return;
    }
    const response = await fetch(
      "https://todobackend-fm9y.api.codehooks.io/dev/clothes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          category: category,
          clothingName: name,
          tags: [color],
        }),
      }
    );
    console.log(response);
  }

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
            <Typography
              variant="h7" 
              sx={{ fontWeight: 'bold' }}
            >
              Add clothes to your wardrobe
            </Typography>
          </FormLabel>
          
          {/* List of form fields */}
          <Stack 
            spacing={1}
          >

            {/* Category */}
            {/* <InputHeader> Category </InputHeader> */}
            <TextField
              select
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
            {/* <InputHeader> Name </InputHeader> */}
            <TextField
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {/* Color */}
            {/* <InputHeader> Color </InputHeader> */}
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
            {/* <InputHeader> Tags </InputHeader> */}
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
                  multiline
                  maxRows={4}
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Press Enter for more tags"
                />
              )}
            />

            {/* Image */}
            <Button variant="contained" component="label">
              Upload Photo
              <input type="file" accept="image/png, image/jpeg" hidden />
            </Button>

            {/* Submit */}
            <Button variant="contained" onClick={addClothes}>
              Submit
            </Button>

          </Stack>
        </FormControl>
      </Box>
    </>
  );
}
