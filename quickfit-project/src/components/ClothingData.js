import { React, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
// MUI Component imports
import { 
  Stack, 
  Skeleton,
  Card,
  Box,
  CssBaseline,
} from "@mui/material";
// DB Clothes Function imports
import {
  getClothes,
  filterClothesByCategory,
  filterClothesByNameOrTag,
} from "@/modules/clothesFunctions";
import OutfitForm from "./OutfitForm";


export default function ClothingData(props) {
    // --- Date ------------------------------------------------------------
    const { date } = props;

    // --- Authorization ---------------------------------------------------
    const jwtTemplateName = process.env.CLERK_JWT_TEMPLATE_NAME;
    const { isLoaded, userId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);
  
    // --- Clothing lists --------------------------------------------------
    const [clothes, setClothes] = useState([]); // List of all clothes from GET request
    const [onePieces, setOnePieces] = useState([]); // List of user's one piece items
    const [tops, setTops] = useState([]); // List of user's one piece items
    const [bottoms, setBottoms] = useState([]); // List of user's one piece items
    const [shoes, setShoes] = useState([]); // List of user's one piece items
    const [accessories, setAccessories] = useState([]); // List of user's one piece items
  
    // --------------------------------------------------------------
    // Make initial GET requests to populate clothing category lists
    // --------------------------------------------------------------
    useEffect(() => { 
      async function processClothes() {
        // Get auth key & user's clothing items
        if (userId) { // Ensure user is logged in before sending GET requests
          const token = await getToken({ template: jwtTemplateName }); // Get auth token
          setClothes(await getClothes(token)); // Get user clothes from codehooks database
          setOnePieces(filterClothesByCategory(clothes, "One Piece")); // Filter one piece items
          setTops(filterClothesByCategory(clothes, "Top")); // Filter top items
          setBottoms(filterClothesByCategory(clothes, "Bottom")); // Filter bottom items
          setShoes(filterClothesByCategory(clothes, "Shoes")); // Filter shoes
          setAccessories(filterClothesByCategory(clothes, "Accessories")); // Filter accessories
          setLoading(false); // Once we get these things, we are no longer loading
        }
      } // Get all clothes lists
      processClothes();
    }, [isLoaded]);
  
    // Load GET requests before showing any content
    if (loading) {
      return ( // Notify users contents are loading
        <> 
          <CssBaseline/>
          <Stack spacing={1.5} width="100vw" alignItems="center" justifyContent="center">
            <Card sx={{backgroundColor:"#EEE"}}>
              <Stack direction="row" alignItems="center" m={1} spacing={1} justifyContent="space-around"width="70vw" height="13vh">
                <Skeleton height="5vh" width="60vw"/>
              </Stack>
            </Card>
          </Stack>
        </>
      );
    } else { // Page contents
      
      // Clothing lists based on current tab, search (names & tags)
      return (
        <>
          <CssBaseline/>
          <OutfitForm date={date} clothes={clothes} onePieces={onePieces} tops={tops} bottoms={bottoms} shoes={shoes} accessories={accessories}/>
        </>
      )
    }
  }
  