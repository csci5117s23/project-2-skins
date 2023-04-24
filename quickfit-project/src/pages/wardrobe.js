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
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;


export default function Wardrobe() {

  const [OnePieces, setOnePieces] = useState([
    {
      category: "OnePiece",
      clothingName: "Artizia black onepiece",
      tags: ["black", "tight"],
      createdOn: new Date(),
    },
    {
      category: "OnePiece",
      clothingName: "Floral short dress",
      tags: ["floral", "flowy", "short dress", "short sleeve"],
      createdOn: new Date(),
    },
    {
      category: "OnePiece",
      clothingName: "Blue Overalls",
      tags: ["jean", "blue"],
      createdOn: new Date(),
    },
  ]);

  const [Tops, setTops] = useState([
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

  const [Bottoms, setBottoms] = useState([
    {
      category: "Bottom",
      clothingName: "Gray Nike Sweatplants",
      tags: ["loose", "gray"],
      createdOn: new Date(),
    },
    {
      category: "Bottom",
      clothingName: "Abrecombie Ripped Denim",
      tags: ["mom jeans", "baggy", "ripped"],
      createdOn: new Date(),
    },
    {
      category: "Bottom",
      clothingName: "Black Mom Jeans",
      tags: ["black jeans", "mom jeans"],
      createdOn: new Date(),
    },
  ]);

  const [Shoes, setShoes] = useState([
    {
      category: "Shoes",
      clothingName: "White Air Forces",
      tags: ["White"],
      createdOn: new Date(),
    },
    {
      category: "Shoes",
      clothingName: "Black high heels",
      tags: ["heels", "black"],
      createdOn: new Date(),
    },
    {
      category: "Shoes",
      clothingName: "White Dr Martin Platforms",
      tags: ["white", "boots", "platforms"],
      createdOn: new Date(),
    },
  ]);

  const [Accessories, setAccessories] = useState([
    {
      category: "Accessories",
      clothingName: "Heart Necklace",
      tags: ["Silver"],
      createdOn: new Date(),
    },
    {
      category: "Accessories",
      clothingName: "Fluffy Tan Scarf",
      tags: ["furry", "tan", "warm"],
      createdOn: new Date(),
    },
    {
      category: "Accessories",
      clothingName: "Black Mittens",
      tags: ["black", "warm"],
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
        <WardrobeTabs OnePieces={OnePieces} Tops={Tops} Bottoms={Bottoms} Shoes={Shoes} Accessories={Accessories}/>
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer></BottomNavigationContainer>
      </section>
    </>
  );
}
