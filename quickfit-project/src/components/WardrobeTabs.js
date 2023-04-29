import { React, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import { Stack, Tabs, Tab, CircularProgress } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
// Custom component imports
import ClothingList from "./ClothingList";
import SearchBar from "./SearchBar";
// DB Clothes Function imports
import {
  getClothes,
  getClothesByCategory,
  filterClothesByCategory,
  addClothes,
  editClothes,
  deleteClothes,
} from "@/modules/clothesFunctions";

export default function WardrobeTabs() {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Search bar -------------------------------------------------------
  const [value, setValue] = useState(0);
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
          value={value}
          onChange={(e, value) => {
            setValue(value);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab label="One Piece" />
          <Tab label="Tops" />
          <Tab label="Bottoms" />
          <Tab label="Shoes" />
          <Tab label="Accessories" />
        </Tabs>
      </Stack>
      <SearchBar setSearch={setSearch} color={"#FFD36E"} />
      <TabPanel value={value} search={search} />
    </>
  );
}

function TabPanel(props) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Search ----------------------------------------------------------
  const { value, search } = props; //

  // --- Clothing lists --------------------------------------------------
  const [category, setCategory] = useState(""); // Current category tab
  const [clothes, setClothes] = useState(""); // List of all clothes from GET request
  const [onePieces, setOnePieces] = useState([]); // List of user's one piece items
  const [tops, setTops] = useState([]); // List of user's one piece items
  const [bottoms, setBottoms] = useState([]); // List of user's one piece items
  const [shoes, setShoes] = useState([]); // List of user's one piece items
  const [accessories, setAccessories] = useState([]); // List of user's one piece items

  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (value === 0 || value === null || value === undefined) {
      setCategory("OnePieces");
    }
    if (value === 1) {
      setCategory("Tops");
    }
    if (value === 2) {
      setCategory("Bottoms");
    }
    if (value === 3) {
      setCategory("Shoes");
    }
    if (value === 4) {
      setCategory("Accessories");
    }

    //TODO: Get request that gets the outfit that matches the search and category type
    //do a fetch to get our outfit given the arguments
    //   fetch(
    //   "our end point/something?category=" + category + "&search=" + search
    //   )
    //   .then((res) => res.json())
    //   .then((data) => setClothes(data));
    
  }, [search, value]);

  // Make get requests to populate clothing category lists
  useEffect(() => {
    async function processClothes() {
      // Get auth key & user's clothing items
      if (userId) {
        // Ensure user is logged in
        const token = await getToken({ template: jwtTemplateName }); // Get auth token
        setClothes(await getClothes(token)); // Get user clothes from codehooks database
        setOnePieces(filterClothesByCategory(clothes, "One Piece")); // Filter one piece items
        setTops(filterClothesByCategory(clothes, "Top")); // Filter top items
        setBottoms(filterClothesByCategory(clothes, "Bottom")); // Filter bottom items
        setShoes(filterClothesByCategory(clothes, "Shoes")); // Filter shoes
        setAccessories(filterClothesByCategory(clothes, "Accessories")); // Filter accessories
        setLoading(false); // Once we get these things, we are no longer loading
      }
    }
    processClothes();
    console.log(clothes);
  }, [isLoaded, value, search]);

  // Load GET requests before showing any content
  if (loading) {
    return (
      <>
        LOADING...
        <CircularProgress />
      </>
    );
  } else { // Page contents
    // <ClothingList clothes={clothes || []} /> // All clothes
    if (value === 0) {
      return <ClothingList clothes={onePieces || []} />;
    }
    else if (value === 1) {
      return <ClothingList clothes={tops || []} />;
    }
    else if (value === 2) {
      return <ClothingList clothes={bottoms || []} />;
    }
    else if (value === 3) {
      return <ClothingList clothes={shoes || []} />;
    }
    else if (value === 4) {
      return <ClothingList clothes={accessories || []} />;
    }
  }
  // --------------------------------------------------------------------------------------
}
