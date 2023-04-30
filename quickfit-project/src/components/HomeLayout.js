import React, { useState, useEffect } from "react";
// import styles from '@/styles/Home.module.css'
import { SignedIn } from "@clerk/clerk-react"; // Clerk authorization imports
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
import { Grid, Button, Stack, Box, Typography } from "@mui/material";
import DateWeatherWidget from "@/components/DateWeatherWidget";
import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import ClothingCard from "@/components/ClothingCard";
import NoFitChosenLayout from "./NoFitChosenLayout";
import { useRouter } from "next/router";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function UILayout({ date, setDate }) {
  const router = useRouter();
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    //TODO: Get request that gets the outfit that matches the date
    //do a fetch to get our outfit given a date
    //   fetch(
    //   "our end point/something?date=" + date
    //   )
    //   .then((res) => res.json())
    //   .then((data) => setOutfit(data));
  }, [date]);

  const handlePreviousDayClick = () => {
    var d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d);
  };

  const handleNextDayClick = () => {
    var d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d);
  };

  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
        <SignedIn>
          <Stack
            width="100vw"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <DateWeatherWidget date={date} setDate={setDate} />

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ width: { xs: "90%", md: "70%" } }}
            >
              <Button variant="contained" onClick={handlePreviousDayClick}>
                <ArrowBackIosNewOutlinedIcon />
              </Button>

              {outfit ? (
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f2f2f2",
                    },
                  }}
                  onClick={() => {
                    router.push({
                      //TODO:figure out how to get outfit id and then pass the value to query
                      pathname: "/choosefit",
                      query: { outfitId: "outfit id" },
                    });
                  }}
                >
                  <Box mr="1vw" sx={{ fontWeight: "bold", color: "#555" }}>
                    Edit Outfit{" "}
                  </Box>
                  <EditTwoToneIcon sx={{ color: "#555" }} />
                </Button>
              ) : null}

              <Button variant="contained" onClick={handleNextDayClick}>
                <ArrowForwardIosOutlinedIcon />
              </Button>
            </Stack>

            <Box
              alignItems="center"
              justifyContent="center"
              sx={{ display: "flex", flexWrap: "wrap", width: "82vw" }}
            >
              {outfit ? (
                outfit.map((clothes) => {
                  return (
                    <Box sx={{ m: 1, width: { xs: "100vw", md: "34vw" } }}>
                      <ClothingCard clothes={clothes} />
                    </Box>
                  );
                })
              ) : (
                <NoFitChosenLayout />
              )}
            </Box>

            <BottomNavigationContainer />
          </Stack>
        </SignedIn>
      </section>
    </>
  );
}
