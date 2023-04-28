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
  Tabs
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import DateCard from "@/components/DateCard";
import WeatherCard from "@/components/WeatherCard";
import ClothingCard from "@/components/ClothingCard";
import TextField from "@mui/material/TextField";
import SearchBar from '../components/SearchBar.js';
import WardrobeTabs from '../components/WardrobeTabs.js';
import OutfitForm from '../components/OutfitForm.js';
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

//TODO: make a form page where it shows blank cards with just top, bottom, shoes, etc.
//make a + button next to the cards that can have more than one thing (tops/accessories/etc)
//when you press that + button a new card will pop up
//make cards have on click and when clicked, show a panel (modal) where you can choose a clothing item

export default function ChooseFit() {

  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
      <OutfitForm/>
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer></BottomNavigationContainer>
      </section>
    </>
  );
}
