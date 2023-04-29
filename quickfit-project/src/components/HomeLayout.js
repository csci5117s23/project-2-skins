import React, { useState, useEffect } from "react";
// import styles from '@/styles/Home.module.css'
import { SignedIn } from "@clerk/clerk-react"; // Clerk authorization imports

import { Grid, Button, Stack, Box, Typography } from "@mui/material";
import DateWeatherWidget from "@/components/DateWeatherWidget";
import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import ClothingCard from "@/components/ClothingCard";
import NoFitChosenLayout from "./NoFitChosenLayout";

// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function UILayout() {
  const [date, setDate] = useState(new Date());
  const [outfit, setOutfit] = useState([
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
      tags: ["silver", "shiny"],
      createdOn: new Date(),
    },
  ]);

  useEffect(() => {
    //TODO: Get request that gets the outfit that matches the date
    //do a fetch to get our outfit given a date
    //   fetch(
    //   "our end point/something?date=" + date
    //   )
    //   .then((res) => res.json())
    //   .then((data) => setOutfit(data));
  }, [date]);

  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
        <SignedIn>
          <Button variant="contained" onClick={()=>{setOutfit(null)}}>clear outfit</Button>
          <Stack width="100vw" spacing={2} alignItems="center" justifyContent="center">
          <DateWeatherWidget date={date} setDate={setDate} />
            {outfit ? outfit.map((clothes) => {
              return (
                <ClothingCard clothes={clothes} />
                );
              }): <NoFitChosenLayout/>}
            <BottomNavigationContainer />
          </Stack>
        </SignedIn>
      </section>
    </>
  );
}
