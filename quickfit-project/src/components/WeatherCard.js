import React, { useState, useEffect } from "react";
import { getDays } from "@/modules/dateFunctions";
import { Typography, Stack, Box } from "@mui/material";

export default function WeatherCard(props) {
  const { date } = props;
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [forecast, setForecast] = useState(null);
  const days = date ? getDays(date) : 0;
  const API_KEY = "0d31ac28d5b7522c7167936c3bc94907";

  //weather api only works up to 30 days into the future
  if (days < 0 || days > 30) {
    return;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function getWeather(position) {
    console.log(position.coords);
    fetch(
      "https://pro.openweathermap.org/data/2.5/forecast/climate?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&units=imperial&appid=" +
        API_KEY
    )
      .then((res) => res.json())
      .then((data) => setAll(data["list"][days]));
  }

  const setAll = (info) => {
    setData(info);
    setForecast(info["weather"][0]);
    setTemp(info["temp"]);
  };

  //-can use this to comfirm date of api call-
  // let unix_timestamp = data['dt']; // get timestamp from weather api call
  // var date1 = new Date(unix_timestamp * 1000);  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // console.log(date1);

  // console.log(data);
  // console.log(temp);
  // console.log(forecast);

  var iconurl = data
    ? "http://openweathermap.org/img/w/" + forecast["icon"] + ".png"
    : "";

  //if you have no weather data, dont render weather card
  if (!data) {
    return;
  }

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box
          component="img"
          sx={{
            height: 60,
            width: 60,
          }}
          alt="Weather icon"
          src={iconurl}
        />
        <Typography variant="h4" sx={{ color: "#696969" }}>
          <Box sx={{ fontWeight: "bold"}}>
            {data && Math.round(temp["min"])}° -{" "}
            {data && Math.round(temp["max"])}°
          </Box>
        </Typography>
        {/* <Box
          component="img"
          sx={{
            height: 75,
            width: 75,
          }}
          alt="Weather icon"
          src={iconurl}
        /> */}
      </Stack>
    </>
  );
}
