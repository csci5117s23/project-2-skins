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
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import DateCard from "@/components/DateCard";
import ClothingCard from "@/components/ClothingCard";
import WeatherCard from "@/components/WeatherCard";

// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function UILayout() {
    const [clothes, setClothes] = useState([
        {
          category: "Top",
          clothingName: "Black Nike T-Shirt",
          tags: ["black"],
          createdOn: new Date(),
        },
        {
          category: "Bottom",
          clothingName: "Dark green cargos",
          tags: ["Green", "loose", "cargo"],
          createdOn: new Date(),
        },
        {
          category: "Shoes",
          clothingName: "White air forces",
          tags: ["white"],
          createdOn: new Date(),
        },
        {
          category: "Accessory",
          clothingName: "Silver necklace",
          tags: ["silver","shiny"],
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
        <SignedIn>
            <DateCard />
            <WeatherCard/>
          <Box className="mainContainer">
            <Card className="weatherCard">Weather goes here</Card>
            {clothes.map((cloth) => {
              return <ClothingCard clothes={cloth} />;
            })}
            <BottomNavigationContainer />
          </Box>
        </SignedIn>
      </section>
    </>
  );
}
