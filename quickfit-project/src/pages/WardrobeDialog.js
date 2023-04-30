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
  Tabs,
  Dialog
} from "@mui/material";

import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import DateCard from "@/components/DateCard";
import WeatherCard from "@/components/WeatherCard";
import ClothingCard from "@/components/ClothingCard";
import TextField from "@mui/material/TextField";
import SearchBar from '../components/SearchBar.js';
import WardrobeTabs from '../components/WardrobeTabs.js';
import ClothesForm from "@/components/ClothesForm.js";

export default function WardrobeDialog() {

  // --- Dialog --------------------------------------------------
  // State of whether or not dialog is open
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [selectedClothing, setSelectedClothing] = useState(null);

  const handleClickOpen = (Clothing) => {
    setSelectedClothing(Clothing);
    setOpen(true);
  };
  const handleUpdate = (update) => {
    setUpdated(update);
    handleCloseDialog();
  };
  // Function to close dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
    <Box>
        <WardrobeTabs clickFunction={handleClickOpen} />
        <Dialog open={open} onClose={handleCloseDialog}>
            <ClothesForm
            clothingToEdit={selectedClothing}
            setUpdated={handleUpdate}
            />
        </Dialog>
    </Box>
    </>
  );
}
