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
  TextField,
  Typography,
  Stack,
  Grid,
  Tabs
} from "@mui/material";
// Custom component imports
import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import DateCard from "@/components/DateCard";
import WeatherCard from "@/components/WeatherCard";
import ClothingCard from "@/components/ClothingCard";
import SearchBar from '@/components/SearchBar.js';
import WardrobeTabs from '@/components/WardrobeTabs.js';
import WardrobeDialog from "./WardrobeDialog.js";
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;


export default function Wardrobe() {

  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
        <WardrobeDialog/>
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer />
      </section>
    </>
  );
}
