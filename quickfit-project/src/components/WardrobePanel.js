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
  Typography,
  Stack,
  Grid,
  TextField,
  styled,
} from "@mui/material";
import ClothingCard from "@/components/ClothingCard";

export default function ClothingList(props) {
  const { clothes, clickFunction} = props;

  return (
    <Stack spacing={1.5} width="100vw" alignItems="center" justifyContent="center">
      {clothes.map((cloth) => {
              return (
                <div
                  onClick={() => {
                    clickFunction?clickFunction(cloth):null;
                  }}
                >
                  <ClothingCard clothes={cloth} />
                </div>
              );
            })}
    </Stack>
  );
}
