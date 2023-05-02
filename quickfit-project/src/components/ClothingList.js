import React, { useState, useEffect } from "react";
// MUI Component imports
import {
  Box,
} from "@mui/material";
// Custom Component imports
import ClothingCard from "@/components/ClothingCard";

export default function ClothingList(props) {
  const { clothes, clickFunction } = props;

  return (
    
    <Box
    alignItems="center"
    justifyContent="center"
    sx={{ display: "flex", flexWrap: "wrap", width:"100vw" }}
    >
      {clothes !== undefined && clothes.map((clothing) => {
        if (clothing !== undefined) {
          return (
            <Box
              key={clothing._id}
              onClick={() => {clickFunction?clickFunction(clothing):null;}}
              sx={{cursor: "pointer", m: 1, width: { xs: "100vw", md: "34vw" } }}
            >
              <ClothingCard clothes={clothing} />
            </Box>
          )};
      })}
    </Box>
  );
}
