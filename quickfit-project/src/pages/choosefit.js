import React, { useState, useEffect } from "react";
// Next-js imports
import Head from "next/head";
import Image from "next/image";
// Clerk authorization imports
import {
  ClerkProvider,
  SignUp,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
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
  Grid,
  Tabs,
  TextField,
  Typography,
  Stack,
  CssBaseline,
} from "@mui/material";
// Custom component imports
import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import DateCard from "@/components/DateCard";
import WeatherCard from "@/components/WeatherCard";
import ClothingCard from "@/components/ClothingCard";
import SearchBar from "@/components/SearchBar.js";
import WardrobeTabs from "@/components/WardrobeTabs.js";
import OutfitForm from "@/components/OutfitForm.js";
import ClothingData from "@/components/ClothingData";
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

//TODO: make a form page where it shows blank cards with just top, bottom, shoes, etc.
//make a + button next to the cards that can have more than one thing (tops/accessories/etc)
//when you press that + button a new card will pop up
//make cards have on click and when clicked, show a panel (modal) where you can choose a clothing item

export default function ChooseFit({date}) {

  return (
    <>
      <CssBaseline/>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
        <ClothingData date={date}/>
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer></BottomNavigationContainer>
      </section>
    </>
  );
}
