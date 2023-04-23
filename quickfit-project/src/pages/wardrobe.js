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
            sx={{
              margin: "1em",
              input: { color: "#FFD36E" },
              label: { color: '#FFD36E' },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFD36E",
                },
              },
            }}
          />
          <Typography
            variant="h4"
            sx={{ color: "#FFD36E", borderColor: "#FFD36E" }}
          >
            Tops
          </Typography>
        </Stack>
        <Grid container width="100vw">
          {clothes.map((cloth) => {
            return (
              <Grid item xs={6}>
                <ClothingCard clothes={cloth} />
              </Grid>
            );
          })}
        </Grid>
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer></BottomNavigationContainer>
      </section>
    </>
  );
}
