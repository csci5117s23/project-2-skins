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
  Paper,
} from "@mui/material";

// DB Clothes Function imports
import {
  getClothes, 
  addClothes, 
  editClothes, 
  deleteClothes 
} from "../modules/clothesFunctions"

// DB Tag Function imports
import {
  getTags, 
  addTag, 
  editTag, 
  deleteTag 
} from "../modules/tagFunctions"

// Custom component imports
import MultipleSelectChip from "./MultiSelectChip";
import AddTagDialog from "./AddTagDialog";
import UploadButtons from "./UploadImageButtons";
import AddTagAutocomplete from "./AddTagAutocomplete";
import AddTagAutoComboBox from "./AddTagComboBox";


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
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // --- Main form state hooks & functions -------------------------------
  const [category, setCategory] = useState("");   // Clothing entry category
  const [color, setColor] = useState("");         // Clothing entry color
  const [name, setName] = useState("");           // Clothing entry name
  const [tagList, setTagList] = useState([]);     // Clothing tags previously made by user
  const [newTags, setNewTags] = useState([]);     // 


  // --- Clothes functions ---
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

  // --- Tag functions ---
  // --------------------------------------------------------------------
  // Function to send POST requests to add to a user's personal tags
  // --------------------------------------------------------------------
  async function addAllTags() {
    // If new tags list is empty, tell user to add more tags
    if (newTags === null || newTags.length === 0) {
      console.log("No tags entered.");
      return;
    }
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Map over each new tag in list of new tags and make a post request to create each
    newTags.map((tag) => { 
      // If tag name is null/empty, don't add tag.
      if (tag.name === null || tag.name === "") {
        console.log("Error. Tag name invalid.");
        return;
      }
      addTag(token, tag); // Otherwise, add tag normally.
    })
  }



  // --------------------------------------------------------------------
  // Run on every render.
  // --------------------------------------------------------------------
  React.useEffect(() => {
    // Set current user tag list to
    setTagList();
    console.log("Middle rendered");
  });
  
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
        
        {/* Clothing form */}
        <FormControl fullWidth>

          {/* Form header */}
          <FormLabel>
            <Paper 
              elevation={4}
              sx={{
                textAlign: "center",
                mt: 1,
                mb: 2,
                py: 1,
                bgcolor: "#EEEEEE",
                borderRadius: 2,
                border: '1px solid grey',
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Add clothes to your wardrobe
              </Typography>
            </Paper>
          </FormLabel>
          
          {/* Form fields */}
          <Stack spacing={1}>

            {/* Category */}
            <InputHeader> Enter clothing details </InputHeader>
            <TextField select
              label="Category*"
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
            <TextField variant="outlined"
              label="Name*"
              value={name}
              placeholder="(Required) Enter a name"
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
              placeholder="(Optional) Please enter a color"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />

            {/* --- Tags --- */}
            <InputHeader> Tags </InputHeader>
            <AddTagAutoComboBox setNewTags={setNewTags} getTags={getTags} addTag={addTag} editTag={editTag} deleteTag={deleteTag}/>
          
            {/* --- Images --- */}
            <InputHeader> Image</InputHeader>
            <UploadButtons/>

            {/* --- Submit --- */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                // bgcolor: 'red',
                pt: 2,
              }}>
              <Button variant="contained"
                sx={{
                  width: '45%',
                }} 
                onClick={ addClothesFE }>
                Submit
              </Button>
            </Box>

          </Stack>
        </FormControl>
      </Box>
    </>
  );
}
