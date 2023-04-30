import { React, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import { 
  Stack, 
  Tabs, 
  Tab, 
  CircularProgress,
  Skeleton,
  Card,
  Box,
  Dialog,
  CssBaseline,
  Tooltip
} from "@mui/material";
// Custom component imports
import ClothingList from "./ClothingList";
import SearchBar from "./SearchBar";
// DB Clothes Function imports
import {
  getClothes,
  getClothesByCategory,
  filterClothesByCategory,
  filterClothesByName,
  filterClothesByTag,
  filterClothesByNameOrTag,
  addClothes,
  editClothes,
  deleteClothes,
} from "@/modules/clothesFunctions";

export default function ClothingSearchList( { category, addFunction } ) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Search ----------------------------------------------------------
  const [search, setSearch] = useState("");

  // --- Edit form dialog ---------------------------------------------
  // State of whether or not dialog is open
  const [open, setOpen] = useState(false);

  // Function to open up webcam dialog/popup
  function handleClickOpen(e) { 
    console.log(e);
    setClickedClothing(e);
    setOpen(true) 
  };

  // Function to close webcam dialog/popup
  function handleCloseDialog() {
    setOpen(false) 
  };

  // --- Clothing lists --------------------------------------------------
  const [clothes, setClothes] = useState([]); // List of all clothes from GET request
  const [onePieces, setOnePieces] = useState([]); // List of user's one piece items
  const [tops, setTops] = useState([]); // List of user's one piece items
  const [bottoms, setBottoms] = useState([]); // List of user's one piece items
  const [shoes, setShoes] = useState([]); // List of user's one piece items
  const [accessories, setAccessories] = useState([]); // List of user's one piece items
  const [shownClothes, setShownClothes] = useState([]); // List of clothes that appear on screen
  const [clickedClothing, setClickedClothing] = useState(null); // Clothing item clicked to edit

  // --------------------------------------------------------------------------
  // Update page render when wardrobe tab changes OR if search results change
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Filter search results based on tab and user text input (name & tags)
    if (userId) { 
      // Display "All" tab
      if (category === "All") {
        setShownClothes(filterClothesByNameOrTag(clothes, search));
      } // Display all "One Piece" tab
      else if (category === "One Piece") {
        setShownClothes(filterClothesByNameOrTag(onePieces, search));
      } // Display "Tops" tab
      else if (category === "Top") {
        setShownClothes(filterClothesByNameOrTag(tops, search));
      } // Display "Bottoms" tab
      else if (category === "Bottom") {
        setShownClothes(filterClothesByNameOrTag(bottoms, search));
      } // Display "Shoes" tab
      else if (category === "Shoes") {
        setShownClothes(filterClothesByNameOrTag(shoes, search));
      } // Display "Accessories" tab
      else if (category === "Accessories") {
        setShownClothes(filterClothesByNameOrTag(accessories, search));
      }
    }
  }, [search]);

  // --------------------------------------------------------------
  // Make initial GET requests to populate clothing category lists
  // --------------------------------------------------------------
  useEffect(() => { 
    async function processClothes() {
      // Get auth key & user's clothing items
      if (userId) { // Ensure user is logged in before sending GET requests
        const token = await getToken({ template: jwtTemplateName }); // Get auth token
        setClothes(await getClothes(token)); // Get user clothes from codehooks database
        setShownClothes(await getClothes(token)); // Get clothes to show on screen based on current search
        setOnePieces(filterClothesByCategory(clothes, "One Piece")); // Filter one piece items
        setTops(filterClothesByCategory(clothes, "Top")); // Filter top items
        setBottoms(filterClothesByCategory(clothes, "Bottom")); // Filter bottom items
        setShoes(filterClothesByCategory(clothes, "Shoes")); // Filter shoes
        setAccessories(filterClothesByCategory(clothes, "Accessories")); // Filter accessories
        setLoading(false); // Once we get these things, we are no longer loading
      }
    } // Get all clothes lists
    processClothes();
  }, [isLoaded]);

  // Load GET requests before showing any content
  if (loading) {
    return ( // Notify users contents are loading
      <> 
        <CssBaseline/>
        <Stack spacing={1.5} width="100vw" alignItems="center" justifyContent="center">
          <Card sx={{backgroundColor:"#EEE"}}>
            <Stack direction="row" alignItems="center" m={1} spacing={1} justifyContent="space-around"width="70vw" height="13vh">
              <Skeleton height="5vh" width="60vw"/>
            </Stack>
          </Card>
        </Stack>
      </>
    );
  } else { // Page contents
    
    // Clothing lists based on current tab, search (names & tags)
    return (
      <>
        <CssBaseline/>
        { console.log("Category: " + category) }

        {/* Search bar */}
        <SearchBar setSearch={setSearch} color={"#000000"} />
        {/* List of clothes based on the current state of clothes to show */}
        <ClothingList 
          clothes={shownClothes || []} 
          clickFunction={addFunction} 
        />
      </>
    )
  }
}
