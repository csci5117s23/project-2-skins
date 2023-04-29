import { React, useState, useEffect } from "react";
// MUI Component imports
import {
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import ClothingList from "./ClothingList";
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
  const { value, search } = props;                // 
  const [category, setCategory] = useState("");   // Current category we are viewing
  const [clothes, setclothes] = useState("");     // List of all clothes from GET request
  const [onePieces, setOnePieces] = useState([]); // List of all one piecce items from GET request

  // --------------------------------------------------------------------------------------
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

  // Make get requests to populate clothing category lists
  useEffect( () => {
    async function processClothes() {

    }
  })



  return ( 
    <>
      <ClothingList clothes={clothes || []} />
    </>
  );
  // --------------------------------------------------------------------------------------
}
