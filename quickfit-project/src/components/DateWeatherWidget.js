import React, { useState, useEffect } from "react";
import DateCard from "./DateCard";
import WeatherCard from "./WeatherCard";
import { formatDate, formatDateWeekday } from "@/modules/dateFunctions";
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
    Stack
} from "@mui/material";

export default function DateWeatherWidget(props){
  const {date} = props;

    return (
        <Card sx={{backgroundColor: "#FFD36E", margin: "1.5vh"}}>
            <Stack alignItems="center" justifyContent="center" spacing={2} minHeight="">
                <DateCard date={date?date:new Date()}/>
                <WeatherCard date={date?date:new Date()}/>  
            </Stack>     
        </Card>     
    )
}
 