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
  CssBaseline,
  Container,
} from "@mui/material";

// DB Clothes Function imports
import {
  getClothes,
  addClothes,
  editClothes,
  deleteClothes,
} from "../modules/clothesFunctions";

// DB Tag Function imports
import { getTags, addTag, editTag, deleteTag } from "../modules/tagFunctions";

// Custom component imports
import PhotoButtons from "./PhotoButtons";
import AddTagComboBox from "./AddTagComboBox";

// Header text styling for each form input
function InputHeader(props) {
  return (
    <Typography
      variant="h8"
      sx={{
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Typography>
  );
}

// Clothes form
export default function ClothesForm() {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Main form state hooks & functions -------------------------------
  const [category, setCategory] = useState(""); // Clothing entry category
  const [color, setColor] = useState(""); // Clothing entry color
  const [name, setName] = useState(""); // Clothing entry name
  const [userTags, setUserTags] = useState([]); // Clothing tags previously made by user (store here)
  const [inputTags, setInputTags] = useState([]); // Clothing tags to apply to this entry
  const [image, setImage] = useState(null);

  // ----------------------------------------
  // Function to reset clothes form inputs
  // ----------------------------------------
  function resetForm() {
    setCategory("");
    setColor("");
    setName("");
    setInputTags([]);
  }

  // --- Clothes functions ---
  // --------------------------------------------------
  // Function to add a clothing article from front-end
  // --------------------------------------------------
  async function onHandleSubmit() {
    // Create a clothing item from state variables to POST
    const clothingItem = {
      category: category,
      name: name,
      color: color,
      tags: inputTags,
    };
    console.log(clothingItem);

    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // Call POST function
    const result = await addClothes(token, clothingItem);

    // On submit also, refresh the form
    resetForm();
  }

  // --- Tag functions ---
  // --------------------------------------------------------------------
  // Function to send POST requests to add to a user's personal tags
  // --------------------------------------------------------------------
  async function addNewTags() {
    // 1) If new tags list is empty, tell user to add more tags
    if (inputTags === null || inputTags.length === 0) {
      console.log("No tags entered.");
      return;
    }
    // 2) Get all user-inputted tag names if there are any objects
    const inputTagNames = inputTags.map((tag) => {
      if (tag.name) {
        return tag.name;
      } else if (typeof tag === "string" || tag instanceof String) {
        return tag;
      }
    });
    // 3) Get existing user tag names
    const existingTagNames = userTags.map((tag) => {
      return tag.name;
    });
    // 4) Map over each current tag and find which ones aren't in the set of pre-existing tags
    let newTags = inputTagNames.filter((tag) => {
      if (existingTagNames.includes(tag) === false) {
        return tag;
      }
    });
    // 5) Ensure list of tags are unique from one another (convert to Set and back to array)
    newTags = Array.from(new Set(newTags));
    
    // 6) Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // 7) Map over each new tag in list of new tags and make a post request to create each
    newTags.map((tag) => {
      // If tag name is null/empty, don't add tag.
      if (tag.name === null || tag.name === "") {
        console.log("Error. Tag name invalid.");
        return;
      }
      addTag(token, tag); // Otherwise, add tag normally.
    });
  }

  // --------------------------------------------------------------------
  // Run on every render.
  // --------------------------------------------------------------------
  React.useEffect(() => {
    console.log("Page rendered.");
    async function process() {
      // Process getting authorization key and user db tags
      if (userId) {
        // Ensure user is logged in
        const token = await getToken({ template: jwtTemplateName }); // Get auth token
        setUserTags(await getTags(token)); // Get user tasks from codehooks database
        setLoading(false); // Once we get these things, we are no longer loading
      }
    }
    process();
    console.log(userTags);
  }, [isLoaded]);

  // JSX
  return (
    <>
      <CssBaseline />
      {/* Clothes form container */}
      <Box
        sx={{
          m: { xs: 0, sm: 1, md: 3, xl: 5 },
          p: { xs: 2, sm: 3, md: 4, xl: 5 },
          height: "87vh",
          bgcolor: "white",
        }}
      >
        {/* Clothing form */}
        <FormControl fullWidth>
          {/* Form header */}
          <FormLabel>
            <Paper
              elevation={2}
              sx={{
                textAlign: "center",
                mb: 2,
                py: 1,
                borderRadius: 2,
                border: "1px solid grey",
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
            <TextField
              select
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
            <TextField
              variant="outlined"
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
            <AddTagComboBox
              userTags={userTags}
              setInputTags={setInputTags}
              getTags={getTags}
              addTag={addTag}
              editTag={editTag}
              deleteTag={deleteTag}
            />

            {/* --- Images --- */}
            <InputHeader> Image</InputHeader>
            <PhotoButtons image={image} setImage={setImage} />
            {image && ( <img src={image} alt="captured-photo"/> )}
     

            {/* --- Submit --- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "45%" }}
                onClick={() => {
                  addNewTags();
                  onHandleSubmit();
                }}
              >
                Submit
              </Button>
            </Box>
            {/* --- Images --- */}
            <InputHeader> Image</InputHeader>
            <PhotoButtons image={image} setImage={setImage} />
            {/* Show preview of image */}
            {image && ( <img src={image} alt="captured-photo"/> )}
            
          </Stack>
        </FormControl>
      </Box>
    </>
  );
}
