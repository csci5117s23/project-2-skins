import { React, useState, useEffect } from "react";
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
  Typography,
  Stack,
  Grid,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import SwipeableViews from 'react-swipeable-views';
import WardrobePanel from "./WardrobePanel";
import SearchBar from "./SearchBar";

export default function WardrobeTabs(props) {
  const [value, setValue] = useState(0);

  return (
    <>
      <Stack alignItems="center" justifyContent="center" direction="row" sx={{ borderBottom: 1, borderColor: "divider", backgroundColor:'white'}}>
        <Tabs
          value={value}
          onChange={(e, value) => {
            setValue(value);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab label="One Piece" />
          <Tab label="Tops" />
          <Tab label="Bottoms" />
          <Tab label="Shoes" />
          <Tab label="Accessories" />
        </Tabs>
      </Stack>
      <SearchBar/>
      <TabPanel value={value} clothes={props}/>
    </>
  );
}

function TabPanel(props){
    const { value, clothes } = props;
    const {OnePieces, Tops, Bottoms, Shoes, Accessories } = clothes;
    
    if(value===0){
        return  <WardrobePanel clothes={OnePieces} />
    }
    if(value===1){
        return  <WardrobePanel clothes={Tops} />
    }
    if(value===2){
        return  <WardrobePanel clothes={Bottoms} />
    }
    if(value===3){
        return  <WardrobePanel clothes={Shoes} />
    }
    if(value===4){
        return  <WardrobePanel clothes={Accessories} />
    }
    
}
