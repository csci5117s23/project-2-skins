import React, { useState, useEffect } from "react";
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
     Typography,
     CssBaseline,
     Container
} from "@mui/material";
// Custom Component imports
import Header from '@/components/Header'
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import ClothesForm from "@/components/ClothesForm";

// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function AddClothes() {
  return (
    <>
      <CssBaseline/>
      {/* 1. Header section */}
      <section>
        <Header/>
      </section>

      {/* 2. Sidebar section */}
      <section>
      
      </section>

      {/* 3. Content section */}
      <section>
        <ClothesForm/>
      </section>

      {/* 4. NavBar section */}
      <section>
        <BottomNavigationContainer/>
      </section>
    </>
  )
}
