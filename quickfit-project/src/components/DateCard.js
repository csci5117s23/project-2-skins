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
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";

// Import date functions
import { formatDate, formatDateWeekday } from "@/modules/dateFunctions";

export default function DateCard(props) {
  const { date } = props;
  return (
    <>
      <Stack
        spacing={1}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Typography variant="h5" sx={{ color: "#696969" }}>
        <Box sx={{ fontWeight: "bold"}}>
          {date ? formatDate(date) : formatDate(new Date())}
          </Box>
        </Typography>
        <CalendarMonthTwoToneIcon />
      </Stack>
    </>
  );
}
