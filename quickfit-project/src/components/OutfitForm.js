import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  Stack,
  IconButton,
  Divider,
  Modal,
  Toolbar,
  Container,
  DialogContentText,
  DialogActions,
  CssBaseline,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
// MUI Icon imports
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
// Custom Component imports
import ClothingSearchList from "@/components/ClothingSearchList";
import ClothingData from "@/components/ClothingData";
import ClothingCard from "@/components/ClothingCard";
import ClothingList from "@/components/ClothingList";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/SearchBar";
import WardrobeTabs from "./WardrobeTabs";
import { formatDateWeekday } from "@/modules/dateFunctions";

// DB Clothing functions
import { filterClothesByCategory } from "@/modules/clothesFunctions";
// DB Outfit functions
import {
  getOutfits,
  getOutfitByDateWorn,
  getOutfitArrayFromIds,
  addOutfit,
  editOutfit,
  deleteOutfit,
} from "@/modules/outfitFunctions";
import OutfitAdd from "./OutfitAdd";

export default function OutfitForm({ date }) {
  // ---  React router --------------------------------------------
  const router = useRouter();

  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { isLoaded, userId, getToken } = useAuth();

  // Properties for the post request to add outfit
  // if there is an outfit id do an update instead of post
  // --- Main form state hooks & functions --------------------------------------------------------------
  const { outfitId } = router.query;
  const [outfit, setOutfit] = useState(null); // List of all clothing entries w/ their details
  const [outfitCoho, setOutfitCoho] = useState(null); // just need a way to store the outfit ID since not stored in 'outfit'
  const [loading, setLoading] = useState(true); // Load GET requests before rendering content
  const [category, setCategory] = useState("");
  const [onePiece, setOnePiece] = useState([]);
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [accessories, setAccessories] = useState([]);

  // --- Dialog state hooks & functions ----------------------------------------------------------------
  // States to show clothing list when "add [clothing]" button clicked
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // States to handle delete clothing button
  const [clothingToDelete, setClothingToDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (selectedClothing) => {
    setClothingToDelete(selectedClothing);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setClothingToDelete(null);
    setOpenDelete(false);
  };

  // Take the ClothingToDelete and remove it from the list
  // Removing an item from list found on https://semicolon.dev/tutorial/javascript/remove-matching-object-from-js-array
  const handleDelete = async () => {
    if (clothingToDelete["category"] == "One Piece") {
      setOnePiece([]);
    } else if (clothingToDelete["category"] == "Top") {
      setTops(removeItemFromList(tops, clothingToDelete));
    } else if (clothingToDelete["category"] == "Bottom") {
      setBottoms(removeItemFromList(bottoms, clothingToDelete));
    } else if (clothingToDelete["category"] == "Shoes") {
      setShoes([]);
    } else if (clothingToDelete["category"] == "Accessories") {
      setAccessories(removeItemFromList(accessories, clothingToDelete));
    }
    setOpenDelete(false);
  };

  // Helper function returns a list that has item removed from it
  const removeItemFromList = (list, item) => {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
    return list;
  };

  // Handle selecting clothing from "add clothing" button
  const handleClickClothes = (clothes) => {
    // Update different clothing lists for later submit
    if (clothes["category"] == "One Piece") {
      if (onePiece.indexOf(clothes) < 0) {
        setOnePiece([clothes]);
      }
    } else if (clothes["category"] == "Top") {
      if (tops.indexOf(clothes) < 0) {
        const newTopsList = tops.concat(clothes);
        setTops(newTopsList);
      }
    } else if (clothes["category"] == "Bottom") {
      if (bottoms.indexOf(clothes) < 0) {
        const newBottomsList = bottoms.concat(clothes);
        setBottoms(newBottomsList);
      }
    } else if (clothes["category"] == "Shoes") {
      if (shoes.indexOf(clothes) < 0) {
        setShoes([clothes]);
      }
    } else if (clothes["category"] == "Accessories") {
      if (accessories.indexOf(clothes) < 0) {
        const newAccessoriesList = accessories.concat(clothes);
        setAccessories(newAccessoriesList);
      }
    }
    setOpen(false);
  };
  
  // --- Outfit functions ---
  // ---------------------------------------------------------
  // Function to add an outfit from front-end state variables
  // ---------------------------------------------------------
  async function onHandleSubmit(e) {
    // Get authorization token from JWT codehooks template
    const token = await getToken({ template: jwtTemplateName });

    // --- Call POST function if we are adding a clothing item ---
    if (outfitId === undefined || outfitId === null || outfitId === "") {
      // Create an outfit from state variables
      const postItem = {
        topId:          getListIds(tops),               // Muliple tops allowed (zip up hoodie with t-shirt)                 
        bottomId:       getListIds(bottoms),            // Multiple bottoms allowed (skirt with leggings)
        shoesId:        getListIds(shoes)[0] || "",     // One pair of shoes only    
        accessoriesId:  getListIds(accessories),        // Multiple accessories allowed (necklace and watch)
        onePieceId:     getListIds(onePiece)[0] || "",  // Only one allowed 
        dateWorn:       new Date(date),                 // Date of when user set to wear this outfit (current calendar date)
      }; 
      // Make POST request
      const result = await addOutfit(token, postItem);
    } 
    // --- Call PUT function if we are editing a clothing item ---
    else {
      // Create an outfit from state variables
      const putItem = {
        ...outfitCoho,
        topId:          getListIds(tops),               // Muliple tops allowed (zip up hoodie with t-shirt)                 
        bottomId:       getListIds(bottoms),            // Multiple bottoms allowed (skirt with leggings)
        shoesId:        getListIds(shoes)[0] || "",     // One pair of shoes only    
        accessoriesId:  getListIds(accessories),        // Multiple accessories allowed (necklace and watch)
        onePieceId:     getListIds(onePiece)[0] || "",  // Only one allowed 
        dateWorn:       new Date(date),                 // Date of when user set to wear this outfit (current calendar date)
      };
      // Make PUT request
      const result = await editOutfit(token, putItem);
    }
    router.push("/");
  }


  // ---------------------------------------------------------------------------
  // Function to convert a list of clothing objects to just a list of their IDs
  // ---------------------------------------------------------------------------
  function getListIds(clothesList) {
    const clothingListIds = clothesList.map((item) => {
      if (item._id) {
        return item._id;
      }
    });
    return Array.from(clothingListIds);
  }

  // Load edit page with current outfit's clothing articles
  useEffect(() => {
    // Perform query to get the current day's outfit
    async function processOutfit() {
      // Get outfit details from query parameter
      if (outfitId) {
        // Get auth token
        const token = await getToken({ template: jwtTemplateName });
        
        const outfitIds = await getOutfits(token, outfitId);
        const outfitDetails = await getOutfitArrayFromIds(token, outfitIds);
        setOutfit(outfitDetails);
        setOutfitCoho(outfitIds);

        // Set lists based on query for outfit details
        setOnePiece(filterClothesByCategory(outfitDetails, "One Piece"));
        setTops(filterClothesByCategory(outfitDetails, "Top"));
        setBottoms(filterClothesByCategory(outfitDetails, "Bottom"));
        setShoes(filterClothesByCategory(outfitDetails, "Shoes"));
        setAccessories(filterClothesByCategory(outfitDetails, "Accessories"));
      }
    }
    processOutfit();
    setLoading(false);
  }, [date, isLoaded]);
  

  var d = new Date();
  var yesterday = d.setDate(d.getDate() - 1);
  var nextMonth = d.setDate(d.getDate() + 30);
  
  if (loading) {
    return <><CircularProgress/></>;
  } else {
    return (
      <>
        <CssBaseline />
        <Card
          sx={{
            backgroundColor: "#ffd83d",
            width: "100vw",
            // backgroundImage:
            //   "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
          {date > yesterday && date < nextMonth ? (
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: {
                    xs: "6vh",
                    md: "8vh",
                    transform: "scale(.9)",
                  },
                }}
              >
                <WeatherCard date={date} />
              </Box>
            </Grid>
          ):null}
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize:{xs:"", md:"3vh"},
                  fontWeight: "Bold",
                  width: "100%",
                }}
              >
                {formatDateWeekday(date)}
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Stack
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"4vw"}
          mb={"4vw"}
        >
          {/* One Pieces */}
          <Card
            sx={{
              backgroundImage:
                "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "90vw", md: "70vw" },
                height: { xs: "5.5vh", md: "8vh" },
              }}
            >
              <CardContent>
                <Typography variant="h5">One Piece</Typography>
              </CardContent>
            </Stack>
          </Card>
          {/* List of clothing items, takes in list of clothes object and onClick function */}
          <ClothingList clothes={onePiece} clickFunction={handleOpenDelete} />
          <Button
            variant="outlined"
            sx={{
              width: { xs: "60vw" },
              height: { xs: "5vh" },
              bgcolor: "#333333",
            }}
            onClick={() => {
              handleOpen();
              setCategory("One Piece");
            }}
          >
            {onePiece !== undefined && onePiece.length > 0 ? (
              <>
                Replace <AutorenewRoundedIcon />
              </>
            ) : (
              <>
                Add One Piece
                <AddIcon />
              </>
            )}
          </Button>

          {/* Tops */}
          <Card
            sx={{
              backgroundImage:
                "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "90vw", md: "70vw" },
                height: { xs: "5.5vh", md: "8vh" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Tops</Typography>
              </CardContent>
            </Stack>
          </Card>
          <ClothingList clothes={tops} clickFunction={handleOpenDelete} />
          <Button
            onClick={() => {
              handleOpen();
              setCategory("Top");
            }}
            variant="outlined"
            sx={{
              width: { xs: "60vw" },
              height: { xs: "5vh" },
              bgcolor: "#333333",
            }}
          >
            {tops !== undefined && tops.length > 0 ? (
              <>
                Add Another Top
                <AddIcon />
              </>
            ) : (
              <>
                Add Top <AddIcon />
              </>
            )}
          </Button>

          {/* Bottoms */}
          <Card
            sx={{
              backgroundImage:
                "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "90vw", md: "70vw" },
                height: { xs: "5.5vh", md: "8vh" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Bottoms</Typography>
              </CardContent>
            </Stack>
          </Card>
          <ClothingList clothes={bottoms} clickFunction={handleOpenDelete} />
          <Button
            variant="outlined"
            sx={{
              width: { xs: "60vw" },
              height: { xs: "5vh" },
              bgcolor: "#333333",
            }}
            onClick={() => {
              handleOpen();
              setCategory("Bottom");
            }}
          >
            {bottoms !== undefined && bottoms.length > 0 ? (
              <>
                Add Another bottom
                <AddIcon />
              </>
            ) : (
              <>
                Add bottom <AddIcon />
              </>
            )}
          </Button>

          {/* Shoes */}
          <Card
            sx={{
              backgroundImage:
                "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "90vw", md: "70vw" },
                height: { xs: "5.5vh", md: "8vh" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Shoes</Typography>
              </CardContent>
            </Stack>
          </Card>
          <ClothingList clothes={shoes} clickFunction={handleOpenDelete} />
          <Button
            variant="outlined"
            sx={{
              width: { xs: "60vw" },
              height: { xs: "5vh" },
              bgcolor: "#333333",
            }}
            onClick={() => {
              handleOpen();
              setCategory("Shoes");
            }}
          >
            {shoes !== undefined && shoes.length > 0 ? (
              <>
                Replace <AutorenewRoundedIcon />
              </>
            ) : (
              <>
                Add Shoes
                <AddIcon />
              </>
            )}
          </Button>

          {/* Accessories */}
          <Card
            sx={{
              backgroundImage:
                "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "90vw", md: "70vw" },
                height: { xs: "5.5vh", md: "8vh" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Accessories</Typography>
              </CardContent>
            </Stack>
          </Card>
          <ClothingList
            clothes={accessories}
            clickFunction={handleOpenDelete}
          />
          <Button
            variant="outlined"
            sx={{
              width: { xs: "60vw" },
              height: { xs: "100%" },
              bgcolor: "#333333",
            }}
            onClick={() => {
              handleOpen();
              setCategory("Accessories");
            }}
          >
            {accessories !== undefined && accessories.length > 0 ? (
              <>
                Add Another Accessory
                <AddIcon />
              </>
            ) : (
              <>
                Add Accessory <AddIcon />
              </>
            )}
          </Button>
          <Button
            variant="contained"
            sx={{
              width: { xs: "65vw", md: "65vw" },
              bgcolor: "#d2d2d2",
              color: "#3C3F42",
            }}
            onClick={(event, value) => {
              onHandleSubmit(event);
              // router.push("/");
            }}
          >
            <Typography variant="h6">Submit outfit </Typography>
          </Button>
        </Stack>
        {/* Clothing list popup, shows when "add [clothing]" button clicked */}
        <Dialog fullScreen open={open} onClose={handleClose}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Choose a fit
              </Typography>
            </Toolbar>
          </AppBar>
          <Card
            sx={{
              backgroundImage:
                "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Stack
              spacing={1.5}
              width="100vw"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              {/* Use wardrobe tab component with different click function */}
              <OutfitAdd
                clickFunction={handleClickClothes}
                category={category}
              />
            </Stack>
          </Card>
        </Dialog>
        {/* Delete clothing button popup, shows when clothing card is clicked */}
        <div>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <Stack alignItems="center" m={2} mb={0}>
              <DialogContentText>
                Are you sure you want to delete this clothing?
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleCloseDelete} variant="contained">
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </Stack>
          </Dialog>
        </div>
      </>
    );
  }
}
