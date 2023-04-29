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
  const { setSearch, color } = props;
  return (
    <Stack alignItems="center">
      <TextField
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        onChange={(e) => {
          setSearch ? setSearch(e.target.value) : null;
        }}
        sx={{
          margin: "1em",
          input: { color: color },
          label: { color: color },
          width: { md: "35vw" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: color,
            },
            "&.Mui-focused fieldset": {
              borderColor: color,
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused ": {
              color: color,
            },
          },
        }}
      ></TextField>
    </Stack>
  );
}
