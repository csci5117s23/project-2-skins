import React, { useState, useEffect } from "react";
import { getDays } from "@/modules/dateFunctions";
import { Typography, Stack, Box, Skeleton } from "@mui/material";

export default function WeatherCard(props) {
  const { date } = props;
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [forecast, setForecast] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    //weather api only works up to 30 days into the future
    if (getDays(date) < 0 || getDays(date) > 30) {
      return;
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, [date]);

  function getWeather(position) {
    fetch(
      "https://pro.openweathermap.org/data/2.5/forecast/climate?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&units=imperial&appid=" +
        API_KEY
    )
      .then((res) => res.json())
      .then((data) => setAll(data["list"][date ? getDays(date) : 0]));
  }

  const setAll = (info) => {
    setData(info);
    setForecast(info["weather"][0]);
    setTemp(info["temp"]);
  };

  var iconurl = data
    ? "http://openweathermap.org/img/w/" + forecast["icon"] + ".png"
    : "";

  //if you have no weather data, dont render weather card
  if (!data) {
    return (
      <Box sx={{ width: "30vw" }}>
        <Skeleton />
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
          }}
          alt="Weather icon"
          src={iconurl}
        />
        <Typography variant="h5" sx={{ color: "#696969" }}>
          {/* <Box sx={{ fontWeight: "bold"}}> */}
          {data && Math.round(temp["min"])}° - {data && Math.round(temp["max"])}
          °{/* </Box> */}
        </Typography>
      </Stack>
    </>
  );
}
