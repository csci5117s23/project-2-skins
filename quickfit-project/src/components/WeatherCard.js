import React, { useState, useEffect } from "react";
import { getDays } from "@/modules/dateFunctions";
import { useGeolocated } from "react-geolocated";
import { Typography, Stack } from "@mui/material";

export default function WeatherCard(props) {
  const { date } = props;
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [forecast, setForecast] = useState(null);
  const days = date ? getDays(date) : 0;

  //weather api only works up to 30 days into the future
  if (days < 0 || days > 30) {
    return;
  }

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  console.log(
    "isGeolocationAvailable: " +
      isGeolocationAvailable +
      " isGeolocationEnabled: " +
      isGeolocationEnabled
  );
  const API_KEY = "0d31ac28d5b7522c7167936c3bc94907";
  const zip = "55423";

  const setAll = (info) => {
    setData(info);
    setForecast(info["weather"][0]);
    setTemp(info["temp"]);
  };

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      fetch(
        "https://pro.openweathermap.org/data/2.5/forecast/climate?zip=" +
          zip +
          "&units=imperial&appid=" +
          API_KEY
      )
        .then((res) => res.json())
        .then((data) => setAll(data["list"][days]));
    }
    console.log(
      "isGeolocationAvailable: " +
        isGeolocationAvailable +
        " isGeolocationEnabled: " +
        isGeolocationEnabled
    );
  }, []);

  //-can use this to comfirm date of api call-
  // let unix_timestamp = data['dt']; // get timestamp from weather api call
  // var date1 = new Date(unix_timestamp * 1000);  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // console.log(date1);

  console.log(data);
  console.log(temp);
  console.log(forecast);
  var iconurl = data
    ? "http://openweathermap.org/img/w/" + forecast["icon"] + ".png"
    : "";

  if (!isGeolocationAvailable||!isGeolocationEnabled) {
    return;
  } 

  return (
    <>
    <Stack direction="row">
     
      <Typography variant="h4" sx={{color: "white"}}>
        {data && Math.round(temp["min"])}° - {data && Math.round(temp["max"])}°
      </Typography>  
      <img id="wicon" src={iconurl} alt="Weather icon" />
    </Stack>


      
    </>
  );
}
