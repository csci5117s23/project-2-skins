import React, { useState, useEffect } from "react";
// import styles from '@/styles/Home.module.css'
import Head from 'next/head'                                                                // Next-js imports
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ClerkProvider, SignUp, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";   // Clerk authorization imports

import {
     AppBar, 
     Box,
     Button,
     Card,
     CardActions,
     CardActionArea,
     CardMedia,
     CardContent,
     Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';

import Header from '@/components/Header'
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import ClothesForm from "@/components/ClothesForm";

// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  
export default function AddClothes() {
  return (
    <>
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