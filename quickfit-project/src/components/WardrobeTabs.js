import { React, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import { 
  Stack, 
  Tabs, 
  Tab, 
  CircularProgress 
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
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

export default function WardrobeTabs() {
  // --- Search bar state hooks -----------------------------------------
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(e, value) => {
            setTabValue(value);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab label="All" />
          <Tab label="One Piece" />
          <Tab label="Tops" />
          <Tab label="Bottoms" />
          <Tab label="Shoes" />
          <Tab label="Accessories" />
        </Tabs>
      </Stack>
      <SearchBar setSearch={setSearch} color={"#FFD36E"} />
      <TabPanel tabValue={tabValue} search={search} />
    </>
  );
}

function TabPanel(props) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Search ----------------------------------------------------------
  const { tabValue, search } = props;

  // --- Clothing lists --------------------------------------------------
  const [category, setCategory] = useState("All"); // Current category tab
  const [clothes, setClothes] = useState([]); // List of all clothes from GET request
  const [onePieces, setOnePieces] = useState([]); // List of user's one piece items
  const [tops, setTops] = useState([]); // List of user's one piece items
  const [bottoms, setBottoms] = useState([]); // List of user's one piece items
  const [shoes, setShoes] = useState([]); // List of user's one piece items
  const [accessories, setAccessories] = useState([]); // List of user's one piece items
  const [shownClothes, setShownClothes] = useState([]); // List of clothes that appear on screen

  // --------------------------------------------------------------------------
  // Update page render when wardrobe tab changes OR if search results change
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Filter search results based on tab and user text input (name & tags)
    if (userId) { 
      // Display "All" tab
      if (tabValue === 0 || tabValue === null || tabValue === undefined) {
        setCategory("All");
        setShownClothes(filterClothesByNameOrTag(clothes, search));
      } // Display all "One Piece" tab
      else if (tabValue === 1) {
        setCategory("One Piece");
        setShownClothes(filterClothesByName(onePieces, search));
      } // Display "Tops" tab
      else if (tabValue === 2) {
        setCategory("Tops");
        setShownClothes(filterClothesByName(tops, search));
      } // Display "Bottoms" tab
      else if (tabValue === 3) {
        setCategory("Bottoms");
        setShownClothes(filterClothesByName(bottoms, search));
      } // Display "Shoes" tab
      else if (tabValue === 4) {
        setCategory("Shoes");
        setShownClothes(filterClothesByName(shoes, search));
      } // Display "Accessories" tab
      else if (tabValue === 5) {
        setCategory("Accessories");
        setShownClothes(filterClothesByName(accessories, search));
      }
    }
  }, [search, tabValue]);

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
        LOADING...
        <CircularProgress />
      </>
    );
  } else { // Page contents

    // Clothing lists based on current tab, search (names & tags)
    return <ClothingList clothes={shownClothes || []} />
  
  }
}
