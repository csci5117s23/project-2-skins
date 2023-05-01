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
  styled,
} from "@mui/material";
import ClothingCard from "@/components/ClothingCard";

export default function ClothingList(props) {
  const { clothes, clickFunction } = props;

  return (
    
    <Box
    alignItems="center"
    justifyContent="center"
    sx={{ display: "flex", flexWrap: "wrap", width:"100vw" }}
    >
      {clothes.map((clothing) => {
        if (clothing !== undefined) {
          return (
            <Box
              key={clothing._id}
              onClick={() => {clickFunction?clickFunction(clothing):null;}}
              sx={{cursor: "pointer", m: 1, width: { xs: "100vw", md: "34vw" } }}
            >
              <ClothingCard clothes={clothing} />
            </Box>
          )};
      })}
    </Box>
  );
}
