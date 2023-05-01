import { React, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
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

export default function WardrobeTabs({ clickFunction, category }) {
  // Get initial tab based on which add button clicked in add/edit outfit form
  let initialTab;
  if (category === "One Piece") {
    initialTab = 1;
  } else if (category === "Top") {
    initialTab = 2;
  } else if (category === "Bottom") {
    initialTab = 3;
  } else if (category === "Shoes") {
    initialTab = 4;
  } else if (category === "Accessories") {
    initialTab = 5;
  } else {
    initialTab = 0;
  }

  // --- Search bar state hooks -----------------------------------------
  const [tabValue, setTabValue] = useState(initialTab);
  const [search, setSearch] = useState("");

  // chnage tab value on swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextTabSwipe(),
    onSwipedRight: () => handlePreviousTabSwipe(),
  });

  const handleNextTabSwipe = ()=>{
    if(tabValue < 4) {
      setTabValue(tabValue+1);
    }
  }

  const handlePreviousTabSwipe = ()=>{
    if(tabValue > 0) {
      setTabValue(tabValue-1);
    }
  }

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
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => {
            setTabValue(value);
          }}
          aria-label="basic tabs example"
        >
          <Tab label="All" sx={{ p: "1px" }} />
          <Tab label="One Piece" sx={{ p: "1px" }} />
          <Tab label="Tops" sx={{ p: "1px" }} />
          <Tab label="Bottoms" sx={{ p: "1px" }} />
          <Tab label="Shoes" sx={{ p: "1px" }} />
          <Tab label="Accessories" sx={{ p: "1px" }} />
        </Tabs>
      </Stack>
      <SearchBar setSearch={setSearch} color={"#949494"} />
      <div {...handlers}>
        <Box
          sx={{
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          <TabPanel
            tabValue={tabValue}
            search={search}
            clickFunction={clickFunction}
            category={category}
          />
        </Box>
      </div>
    </>
  );
}

function TabPanel(props) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(true);

  // --- Search ----------------------------------------------------------
  const { tabValue, search, clickFunction, category } = props;

  // --- Clothing lists --------------------------------------------------
  const [clothes, setClothes] = useState([]); // List of all clothes from GET request
  const [onePieces, setOnePieces] = useState([]); // List of user's one piece items
  const [tops, setTops] = useState([]); // List of user's one piece items
  const [bottoms, setBottoms] = useState([]); // List of user's one piece items
  const [shoes, setShoes] = useState([]); // List of user's one piece items
  const [accessories, setAccessories] = useState([]); // List of user's one piece items
  const [shownClothes, setShownClothes] = useState([]); // List of clothes that appear on screen

  // --- Dialog --------------------------------------------------

  // State of whether or not dialog is open
  const [open, setOpen] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState(null);

  const handleClickOpen = (Clothing) => {
    setSelectedClothing(Clothing);
    setOpen(true);
  };
  const handleUpdate = (update) => {
    setUpdated(update);
    handleCloseDialog();
  };
  // Function to close dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // --------------------------------------------------------------
  // Make GET requests to populate clothing category lists
  // --------------------------------------------------------------
  async function processClothes() {
    // Get auth key & user's clothing items
    const token = await getToken({ template: jwtTemplateName }); // Get auth token
    const clothes = await getClothes(token);
    // Get user clothes from codehooks database
    setClothes(clothes);
    // Once we get clothes, we are no longer loading or updating
    setLoading(false);
    setUpdated(false);
  }

  // --------------------------------------------------------------------------
  // Update page render when wardrobe tab changes OR if search results change
  // --------------------------------------------------------------------------
  const handleTabs = () => {
    // Display "All" tab
    if (tabValue === 0 || tabValue === null || tabValue === undefined) {
      setShownClothes(filterClothesByNameOrTag(clothes, search));
    } // Display all "One Piece" tab
    else if (tabValue === 1) {
      setShownClothes(filterClothesByNameOrTag(onePieces, search));
    } // Display "Tops" tab
    else if (tabValue === 2) {
      setShownClothes(filterClothesByNameOrTag(tops, search));
    } // Display "Bottoms" tab
    else if (tabValue === 3) {
      setShownClothes(filterClothesByNameOrTag(bottoms, search));
    } // Display "Shoes" tab
    else if (tabValue === 4) {
      setShownClothes(filterClothesByNameOrTag(shoes, search));
    } // Display "Accessories" tab
    else if (tabValue === 5) {
      setShownClothes(filterClothesByNameOrTag(accessories, search));
    }
  };

  useEffect(() => {
    // Ensure user is logged in before sending GET requests
    if (userId) {
      if (updated || loading) {
        processClothes();
      } else {
        // Filter search results based on tab and user text input (name & tags)
        handleTabs();
      }
    }
  }, [isLoaded, updated, search, tabValue, accessories]);

  //once clothes is set, set the categories
  useEffect(() => {
    setOnePieces(filterClothesByCategory(clothes, "One Piece")); // Filter one piece items
    setTops(filterClothesByCategory(clothes, "Top")); // Filter top items
    setBottoms(filterClothesByCategory(clothes, "Bottom")); // Filter bottom items
    setShoes(filterClothesByCategory(clothes, "Shoes")); // Filter shoes
    setAccessories(filterClothesByCategory(clothes, "Accessories")); // Filter accessories
  }, [clothes]);

  // Load GET requests before showing any content
  if (loading) {
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
          clickFunction={handleClickOpen}
        />
        <Dialog open={open} onClose={handleCloseDialog}>
          <ClothesForm
            clothingToEdit={selectedClothing}
            setUpdated={handleUpdate}
          />
        </Dialog>
      </>
    );
  }
}
