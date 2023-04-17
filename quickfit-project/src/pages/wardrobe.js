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
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import DateCard from "@/components/DateCard";
import WeatherCard from "@/components/WeatherCard";
import ClothingCard from "@/components/ClothingCard";
import TextField from "@mui/material/TextField";
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function Wardrobe() {
  const [clothes, setClothes] = useState([
    {
      category: "Top",
      clothingName: "Black Nike T-Shirt",
      tags: ["black"],
      createdOn: new Date(),
    },
    {
      category: "Top",
      clothingName: "Dark green Long sleeve",
      tags: ["Green", "loose", "long sleeve"],
      createdOn: new Date(),
    },
    {
      category: "Top",
      clothingName: "White Button up",
      tags: ["white", "Button up"],
      createdOn: new Date(),
    },
    {
      category: "Top",
      clothingName: "Red shein crop top",
      tags: ["cropped", "red", "shein"],
      createdOn: new Date(),
    },
  ]);
  

  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
        <Stack alignItems="center">
          <TextField
            id="outlined-basic"
            label="Search..."
            variant="outlined"
            sx={{ margin: "1em" }}
          />
          <Typography variant="h4" sx={{ color: "gray" }}>
            Tops
          </Typography>
        </Stack>
        {clothes.map((cloth) => {
          return <ClothingCard clothes={cloth}/>;
        })}
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer></BottomNavigationContainer>
      </section>
    </>
  );
}
