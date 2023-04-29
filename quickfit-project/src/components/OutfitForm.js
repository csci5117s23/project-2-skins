import React, { useState, useEffect } from "react";
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
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import ClothingCard from "@/components/ClothingCard";
import ClothingList from "@/components/WardrobePanel";
import SearchBar from "@/components/SearchBar";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

export default function OutfitForm() {
  //TODO: add the rest of the clothing categories
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);

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
    setOpenDelete(false)
  };

  //list of clothes from the get request
  const [clothes, setClothes] = useState([
    {
      category: "OnePiece",
      clothingName: "Artizia black onepiece",
      tags: ["black", "tight"],
      createdOn: new Date(),
    },
    {
      category: "OnePiece",
      clothingName: "Floral short dress",
      tags: ["floral", "flowy", "short dress", "short sleeve"],
      createdOn: new Date(),
    },
    {
      category: "OnePiece",
      clothingName: "Blue Overalls",
      tags: ["jean", "blue"],
      createdOn: new Date(),
    },
  ]);

  //handle selecting clothing from add
  const handleClickClothes = (clothes) => {
    //TODO: add the rest of the if else cases

    //actual category name might have different spelling once implemented. watch out for that
    if (clothes["category"] === "OnePiece") {
    } else if (clothes["category"] === "Top") {
      //add clothes to the state list
      // setTop() logic to append top to the end
    }

    setOpen(false);
  };

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
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">One Piece</Typography>
            </CardContent>
          </Stack>
        </Card >
        <ClothingList clothes={clothes} clickFunction={handleOpenDelete}/>
        <Button
          variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
          onClick={handleOpen}
        >
          Add One Piece <AddIcon />{" "}
        </Button>

        {/* Tops */}
        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
          }}
        >
          <Stack alignItems={"center"} width="80vw">
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
          Add Top <AddIcon />{" "}
        </Button>

        {/* Bottoms */}
        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
          }}
        >
          <Stack alignItems={"center"} width="80vw">
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
          Add Bottom <AddIcon />{" "}
        </Button>

        {/* Shoes */}
        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">Shoes</Typography>
            </CardContent>
          </Stack>
        </Card>

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
        >
          Add Shoes <AddIcon />{" "}
        </Button>

        {/* Accessories */}
        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">Accessories</Typography>
            </CardContent>
          </Stack>
        </Card>

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ width: { xs: "60vw" }, height: { xs: "5vh" } }}
        >
          Add Accessories <AddIcon />{" "}
        </Button>
        <Button variant="contained">
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
              Choose a Fit
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Card
          sx={{
            backgroundColor: "#3C3F42",
          }}
        >
          <Stack
            spacing={1.5}
            width="100vw"
            height="100vw"
            alignItems="center"
            justifyContent="center"
          >
            <SearchBar />
            <ClothingList clothes={clothes} clickFunction={handleClickClothes}/>
          </Stack>
        </Card>
      </Dialog>
      {/* Clothing list popup, shows when "add [clothing]" button clicked */}/
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Choose a Fit
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Card
          sx={{
            backgroundColor: "#3C3F42",
            height:"100vh",
          }}
        >
          <Stack
            spacing={1.5}
            width="100vw"
            alignItems="center"
            justifyContent="center"
          >
            <SearchBar />
            {clothes.map((cloth) => {
              return (
                <div
                  onClick={() => {
                    handleClickClothes(cloth);
                  }}
                >
                  <ClothingCard clothes={clothes} />
                </div>
              );
            })}
          </Stack>
        </Card>
      </Dialog>
      
      {/* Delete clothing button popup, shows when clothing card is clicked */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <Box >
            <Button variant="contained"> Remove Clothing </Button>
        </Box>
      </Modal>
    </>
  );
}
