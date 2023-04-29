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
import SwipeableViews from "react-swipeable-views";
import WardrobePanel from "./ClothingList";
import SearchBar from "./SearchBar";

export default function WardrobeTabs() {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");

  
  // useEffect(() => {
  //   console.log(search);
  // }, [search]);

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
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
      <SearchBar setSearch={setSearch} color={"#FFD36E"} />
      <TabPanel value={value} search={search} />
    </>
  );
}

function TabPanel(props) {
  const { value, search } = props;
  const [category, setCategory] = useState("");
  const [clothes, setclothes] = useState({});

  //remove these states after useEffect------------
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
  //-------------------------------------------
  useEffect(() => {
    if (value === 0) {
      setCategory("OnePieces");
    }
    if (value === 1) {
      setCategory("Tops");
    }
    if (value === 2) {
      setCategory("Bottoms");
    }
    if (value === 3) {
      setCategory("Shoes");
    }
    if (value === 4) {
      setCategory("Accessories");
    }
    //TODO: Get request that gets the outfit that matches the search and category type
    //do a fetch to get our outfit given the arguments
    //   fetch(
    //   "our end point/something?category=" + category + "&search=" + search
    //   )
    //   .then((res) => res.json())
    //   .then((data) => setClothes(data));
  }, [search, value]);

  //TODO: uncomment this after useEffect implemented
  // return <WardrobePanel clothes={clothes} />;

  //TODO:remove these after implementing useEffect------------
  if (value === 0) {
    return <WardrobePanel clothes={OnePieces} />;
  }
  if (value === 1) {
    return <WardrobePanel clothes={Tops} />;
  }
  if (value === 2) {
    return <WardrobePanel clothes={Bottoms} />;
  }
  if (value === 3) {
    return <WardrobePanel clothes={Shoes} />;
  }
  if (value === 4) {
    return <WardrobePanel clothes={Accessories} />;
  }
  //--------------------------------------
}
