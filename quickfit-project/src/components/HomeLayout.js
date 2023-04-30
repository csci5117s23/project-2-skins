import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Clerk authorization imports
import { SignedIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import { 
  Box, 
  Button,
  CssBaseline,
  Grid, 
  Stack, Typography, 
} from "@mui/material";
// MUI Icon imports
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
// DB Outfit functions
import { 
  getOutfitByDateWorn,
  getOutfitArrayFromIds
} from "@/modules/outfitFunctions";
// Custom component imports
import DateWeatherWidget from "@/components/DateWeatherWidget";
import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import ClothingCard from "@/components/ClothingCard";
import NoFitChosenLayout from "@/components/NoFitChosenLayout";

export default function UILayout({ date, setDate }) {
  // --- Authorization ---------------------------------------------------
  const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
  const { getToken } = useAuth();

  const router = useRouter();
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // const [outfit, setOutfit] = useState([
  //   {
  //     category: "Top",
  //     clothingName: "Black Nike T-Shirt",
  //     tags: ["black"],
  //     createdOn: new Date(),
  //   },
  //   {
  //     category: "Bottom",
  //     clothingName: "Dark green cargos",
  //     tags: ["Green", "loose", "cargo"],
  //     createdOn: new Date(),
  //   },
  //   {
  //     category: "Shoes",
  //     clothingName: "White air forces",
  //     tags: ["white"],
  //     createdOn: new Date(),
  //   },
  //   {
  //     category: "Accessory",
  //     clothingName: "Silver necklace",
  //     tags: ["silver", "shiny"],
  //     createdOn: new Date(),
  //   },
  // ]);

  useEffect(() => {
    //TODO: Get request that gets the outfit that matches the date
    //do a fetch to get our outfit given a date
    //   fetch(
    //   "our end point/something?date=" + date
    //   )
    //   .then((res) => res.json())
    //   .then((data) => setOutfit(data));

    // Perform query to get the current day's outfit
    async function processOutfit() {
      const token = await getToken({ template: jwtTemplateName });
      const outfitIds = await getOutfitByDateWorn(token, date);
      const outfitDetails = await getOutfitArrayFromIds(token, outfitIds[0]);
      console.log((outfitDetails));
      setOutfit(outfitDetails);
      setLoading(false);
    }
    processOutfit();
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

  // Load GET requests before showing content
  if (loading) {
    return <></>
  } 
  else { // Show page contents when done loading
    return (
      <>
        <CssBaseline/>
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
                      <Box
                        // key={clothes._id}
                        sx={{ m: 1, width: { xs: "100vw", md: "34vw" } }}
                      >
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
}
