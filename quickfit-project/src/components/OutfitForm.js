import * as React from "react";
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
  Divider,
  Modal,
  Container,
} from "@mui/material";
import ClothingCard from "@/components/ClothingCard";

export default function OutfitForm() {
  const top = {
    category: "Top",
    clothingName: "Black Nike T-Shirt",
    tags: ["black"],
    createdOn: new Date(),
  };
  const onepiece = {
    category: "One Piece",
    clothingName: "Black Nike Onesie",
    tags: ["black"],
    createdOn: new Date(),
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
        <Card
          onClick={() => {
            console.log(
              "ToDo: when clicked show all clothes a list of clothes in that category as a pop up using Modal"
            );
          }}
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            backgroundSize: "30vw",
            cursor:"pointer"
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">One Piece</Typography>
            </CardContent>
          </Stack>
        </Card>

        <ClothingCard clothes={onepiece} />

        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            backgroundSize: "30vw",
            cursor:"pointer"
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">Tops</Typography>
            </CardContent>
          </Stack>
        </Card>

        <ClothingCard clothes={top} />
       <Button variant="outlined">+</Button>
        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            backgroundSize: "30vw",
            cursor:"pointer"
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">Bottoms</Typography>
            </CardContent>
          </Stack>
        </Card>



        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            backgroundSize: "30vw",
            cursor:"pointer"
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">Shoes</Typography>
            </CardContent>
          </Stack>
        </Card>

        <Card
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
            backgroundSize: "30vw",
            cursor:"pointer"
          }}
        >
          <Stack alignItems={"center"} width="80vw">
            <CardContent>
              <Typography variant="h5">Accessories</Typography>
            </CardContent>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}
