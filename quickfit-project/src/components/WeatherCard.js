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

export default function WeatherCard() {
  return (
    <Card className="weatherCard">
        Weather goes here
    </Card>
  )
}