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
// Custom component imports
import ClothingData from "./ClothingData";
import SearchBar from "./SearchBar";
// DB Clothes Function imports
import {
  getClothes,
  getClothesByCategory,
  filterClothesByCategory,
  filterClothesByName,
  filterClothesByTag,
  filterClothesByNameOrTag,
  addClothes,
  editClothes,
  deleteClothes,
} from "@/modules/clothesFunctions";
import ClothesForm from "./ClothesForm";
import ClothingList from "./ClothingList";

export default function ClothingSearchList(props) {
  const { category } = props; 
  // --- Search bar state hooks -----------------------------------------
  const [search, setSearch] = useState("");
  return (
    <>
      <CssBaseline/>
      <SearchBar setSearch={setSearch} color={"#FFD36E"} />
      <ClothingData category={category} search={search}>
        RATS
      </ClothingData>
    </>
  );
}