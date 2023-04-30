import React, { useState, useEffect } from "react";
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
  Stack,
  IconButton,
  Divider,
  Modal,
  Toolbar,
  Container,
  DialogContentText,
  DialogActions,
  CssBaseline,
} from "@mui/material";
// Custom Component imports
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import ClothingCard from "@/components/ClothingCard";
import ClothingList from "@/components/ClothingList";
import SearchBar from "@/components/SearchBar";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';

import { useRouter } from "next/router";
import ClothingSearchList from "./ClothingSearchList";

export default function OutfitForm(props) {
  const { 
    date,
    clothes,
    onePieces,
    tops,
    bottoms,
    shoes,
    accessories, 
  } = props;

  // Router for redirection
  const router = useRouter();

  // State hooks for form elements
  const [onePieceItem, setOnePieces] = useState(null); // Outfit one piece
  const [topsItem, setTops] = useState(null); // Outfit top 
  const [bottomsItem, setBottoms] = useState(null); // Outfit bottom
  const [shoesItem, setShoes] = useState(null); // Outfit shoes
  const [accessoryItems, setAccessories] = useState(null); // Outfit accessories
  const [category, setCategory] = useState("All");

  // properties for the post request to add outfit
  // if there is an outfit id do an update instead of post
  const {outfitId} = router.query;

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

  // take the ClothingToDelete and remove it from the list
  // removing an item from list found on https://semicolon.dev/tutorial/javascript/remove-matching-object-from-js-array
  const handleDelete = () => {
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
  //helper function returns a list that has item removed from it
  const removeItemFromList = (list, item) => {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
    return list;
  };

  // Handle selecting clothing from "add clothing" button
  const handleClickClothes = (clothes) => {
    if (clothes["category"] == "One Piece") { // One piece items
      if (onePiece.indexOf(clothes) < 0){
        setOnePiece([clothes]);
      }
    } else if (clothes["category"] == "Top") { // Top items
        if (tops.indexOf(clothes) < 0){
          const newTopsList = tops.concat(clothes);
          setTops(newTopsList);  
        }
    } else if (clothes["category"] == "Bottom") { // Bottom items
        if (bottoms.indexOf(clothes) < 0){
          const newBottomsList = bottoms.concat(clothes);
          setBottoms(newBottomsList);
        }
    } else if (clothes["category"] == "Shoes") { // Shoe items
        if (shoes.indexOf(clothes) < 0){
          setShoes([clothes]);
        }      
    } else if (clothes["category"] == "Accessories") { // Accessory items
        if (accessories.indexOf(clothes) < 0){
          const newAccessoriesList = accessories.concat(clothes);
          setAccessories(newAccessoriesList);
        }
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("inuse effect")
    if (outfitId) { 
      console.log("outfit id not null")
      for (const clothing of outfit) {
        console.log(clothing)
        handleClickClothes(clothing);
      }   
    }
    
  }, []);

    
  const getOutfit = (outfitId) =>{
      //TODO using outfitId retrieve outfit
      // var outfit = fetch(outfit)
      
  }  
  //when selecting add, this will get the clothes that populate the list
  //replace handleOpen on each onClick with this
  const handleTops = () => {
    //fetch tops
    // fetch()
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setClothes(data)
    //     setOpen(true);
    //   });
  };

  return (
    <>
      <CssBaseline/>
      <Stack
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"4vw"}
        mb={"4vw"}
      >
         
        {/* --- One Pieces --------------------------------------------------------- */}
        <Card 
          sx={{ backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)"}}
        >
          <Stack alignItems={"center"} 
            sx={{ width: { xs: "90vw", md: "70vw" } }}
          >
            <CardContent>
              <Typography variant="h5">One Piece</Typography>
            </CardContent>
          </Stack>
        </Card>
        <Button variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
          onClick={handleOpen}
        >
          { (onePieceItem !== null) ? (
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

        {/* --- Tops --------------------------------------------------------- */}
        <Card
          sx={{ backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)" }}
        >
          <Stack
            alignItems={"center"}
            sx={{ width: { xs: "90vw", md: "70vw" } }}
          >
            <CardContent>
              <Typography variant="h5">Tops</Typography>
            </CardContent>
          </Stack>
        </Card>
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
        >
          {tops.length > 0 ? (
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

        {/* --- Bottoms --------------------------------------------------------- */}
        <Card
          sx={{ backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)" }}
        >
          <Stack
            alignItems={"center"}
            sx={{ width: { xs: "90vw", md: "70vw" } }}
          >
            <CardContent>
              <Typography variant="h5">Bottoms</Typography>
            </CardContent>
          </Stack>
        </Card>
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
        >
          {bottoms.length > 0 ? (
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

        {/* --- Shoes --------------------------------------------------------- */}
        <Card
          sx={{ backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)" }}
        >
          <Stack
            alignItems={"center"}
            sx={{ width: { xs: "90vw", md: "70vw" } }}
          >
            <CardContent>
              <Typography variant="h5">Shoes</Typography>
            </CardContent>
          </Stack>
        </Card>
        <ClothingList clothes={shoes} clickFunction={handleOpenDelete} />
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
        >
          {shoes.length > 0 ? (
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

        {/* --- Accessories --------------------------------------------------------- */}
        <Card
          sx={{ backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)" }}
        >
          <Stack
            alignItems={"center"}
            sx={{ width: { xs: "90vw", md: "70vw" } }}
          >
            <CardContent>
              <Typography variant="h5">Accessories</Typography>
            </CardContent>
          </Stack>
        </Card>
        <Button variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
          onClick={handleOpen}
        >
          {accessories.length > 0 ? (
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
        <Button variant="contained"
          sx={{ width: {xs: "50vw", md: "70vw"}, borderRadius:"1.25em", backgroundColor:"#c2c2c2", color:"#3C3F42" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Typography variant="h6">Submit outfit</Typography>
        </Button>
      </Stack>


      {/* Clothing list popup, shows when "add [clothing]" button clicked */}/
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
            bgcolor: "#333333",
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
            <ClothingList category={"All"}/>
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
              <Button onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
            </DialogActions>
          </Stack>
        </Dialog>
      </div>
    </>
  );
}
