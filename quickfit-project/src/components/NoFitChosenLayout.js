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
} from "@mui/material";

import { useRouter } from "next/router";

export default function NoFitChosenLayout() {
    const router = useRouter();
  return (
    <Stack
      spacing={3}
      height={"55vh"}
      alignItems="center"
      justifyContent="center"
      sx={{
        borderStyle:"solid",
        borderColor:"#FFFFFF",
        borderRadius:"1.5vh"
      }}
    >
      <Typography variant="h5" sx={{ color: "#FFFFFF" }}>
        No outfit chosen yet
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          "&:hover": {
            backgroundColor: "#f2f2f2",
          },
        }}
        onClick={() => {
            router.push("/choosefit");
          }}
      >
        Choose An Outfit
      </Button>
    </Stack>
  );
}
