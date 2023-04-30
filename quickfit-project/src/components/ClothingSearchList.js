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
} from "@mui/material";
// Custom component imports
import ClothingList from "./ClothingList";
import SearchBar from "./SearchBar";
import ClothesForm from "./ClothesForm";

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

export default function ClothingSearchList( {categoryInput, clickFunction} ) {
  // --- Search bar state hooks -----------------------------------------
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchBar setSearch={setSearch} color={"#FFD36E"} />
      <ClothingData categoryInput={categoryInput} search={search} clickFunction={clickFunction} />
    </>
  );
}

function ClothingData(props) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // --- Search ----------------------------------------------------------
  const { categoryInput, search, clickFunction } = props;

  // --- Clothing lists --------------------------------------------------
  const [category, setCategory] = useState(categoryInput); // Current category tab
  const [updated, setUpdated] = useState(false);
  const [clothes, setClothes] = useState([]); // List of all clothes from GET request
  const [onePieces, setOnePieces] = useState([]); // List of user's one piece items
  const [tops, setTops] = useState([]); // List of user's one piece items
  const [bottoms, setBottoms] = useState([]); // List of user's one piece items
  const [shoes, setShoes] = useState([]); // List of user's one piece items
  const [accessories, setAccessories] = useState([]); // List of user's one piece items
  const [shownClothes, setShownClothes] = useState([]); // List of clothes that appear on screen

  // --------------------------------------------------------------
  // Make GET requests to populate clothing category lists
  // --------------------------------------------------------------
  async function processClothes() {
    // Get auth key & user's clothing items
      const token = await getToken({ template: jwtTemplateName }); // Get auth token
      getClothes(token).then((clothes) => {
        // Get user clothes from codehooks database
        setClothes(clothes);
        setShownClothes(clothes);
        setOnePieces(filterClothesByCategory(clothes, "One Piece")); // Filter one piece items
        setTops(filterClothesByCategory(clothes, "Top")); // Filter top items
        setBottoms(filterClothesByCategory(clothes, "Bottom")); // Filter bottom items
        setShoes(filterClothesByCategory(clothes, "Shoes")); // Filter shoes
        setAccessories(filterClothesByCategory(clothes, "Accessories")); // Filter accessories
      });
      setLoading(false); // Once we get these things, we are no longer loading
      setUpdated(false);
  }

  // --------------------------------------------------------------------------
  // Update page render when wardrobe tab changes OR if search results change
  // --------------------------------------------------------------------------
  const handleTabs = () => {
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
  };

  useEffect(() => {
    // Ensure user is logged in before sending GET requests
    if (userId) {
      if (updated) {
        processClothes().then(() => {
          handleTabs();
        });
      }
      // Filter search results based on tab and user text input (name & tags)
      handleTabs();
    }
  }, [isLoaded, updated, search, category]);

  // Load GET requests before showing any content
  if (loading || shownClothes?.length == 0) {
    return (
      // Notify users contents are loading
      <>
        <Stack
          spacing={1.5}
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <Card sx={{ backgroundColor: "#EEE" }}>
            <Stack
              direction="row"
              alignItems="center"
              m={1}
              spacing={1}
              justifyContent="space-around"
              width="80vw"
              height="13vh"
            >
              <Stack>
                <Skeleton height="5vh" width="50vw" />
                <Stack direction="row" spacing={1}>
                  <Skeleton height="3vh" width="10vw" />
                  <Skeleton height="3vh" width="10vw" />
                  <Skeleton height="3vh" width="10vw" />
                  <Skeleton height="3vh" width="10vw" />
                </Stack>
              </Stack>
              <Skeleton height="100%" width="100%" />
            </Stack>
          </Card>
        </Stack>
      </>
    );
  } else {
    // Page contents

    // Clothing lists based on current tab, search (names & tags)
    return (
      <>
        <ClothingList
          clothes={shownClothes || []}
          clickFunction={clickFunction}
        />
      </>
    );
  }
}
