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
  Box
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

export function ClothingSearchbar() {
  // --- Search bar state hooks -----------------------------------------
  const [search, setSearch] = useState("");
  return (
    <><SearchBar setSearch={setSearch} color={"#FFD36E"} /></>
  );
}

export default function ClothingData(props) {
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
    return (
        <>
        <Box>
            {...children}
        </Box>
        </>
    )  
  }
}
