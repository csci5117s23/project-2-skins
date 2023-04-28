import React, { useState, useEffect } from "react";
// import styles from '@/styles/Home.module.css'
import Head from "next/head"; // Next-js imports
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignUp,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"; // Clerk authorization imports

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
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export default function SearchBar(props) {
  const { setSearch } = props;
  return (
    <Stack alignItems="center">
      <TextField
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          margin: "1em",
          input: { color: "#FFD36E" },
          label: { color: "#FFD36E" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FFD36E",
            },
          },
        }}
      ></TextField>
    </Stack>
  );
}
