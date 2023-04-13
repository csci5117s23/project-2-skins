import React, { useState, useEffect } from "react";
// import styles from '@/styles/Home.module.css'
import Head from 'next/head'                                                                // Next-js imports
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ClerkProvider, SignUp, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";   // Clerk authorization imports

import { AppBar } from "@mui/material";

import Header from '@/components/Header'

import BottomNavigationContainer from "@/components/BottomNavigationContainer";

// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function UILayout() {
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
        <div>
            This content is always visible.
        </div>

        <SignedIn>
            <Box className="mainContainer">

                <BottomNavigationContainer/>
            </Box>
        </SignedIn>
        </section>
    </>
  )
}
