import React, { useState, useEffect } from "react";
import { getDays } from "@/modules/dateFunctions";

import {
  Card,
} from "@mui/material";

export default function WeatherCard(props) {
  const {date} = props;
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [forecast, setForecast] = useState(null);
  const days = date ? getDays(date) : 0;

  //weather api only works up to 30 days into the future
  if(days < 0 || days > 30){
    return;
  }

  const API_KEY="0d31ac28d5b7522c7167936c3bc94907"
  const zip="55423"

  const setAll = (info)=>{
    setData(info)
    setForecast(info['weather'][0]['main'])
    setTemp(info['temp'])
  }

  useEffect(() => {
    fetch(
      "https://pro.openweathermap.org/data/2.5/forecast/climate?zip="+zip+"&units=imperial&appid="+API_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        setAll(data['list'][days]);
      });
  }, []);
  
  //-can use this to comfirm date of api call-
  // let unix_timestamp = data['dt']; // get timestamp from weather api call
  // var date1 = new Date(unix_timestamp * 1000);  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // console.log(date1);
  
  console.log(data);
  console.log(temp);
  console.log(forecast);

  return <Card className="weatherCard">{data && forecast} | min:{data && Math.round(temp['min'])}° - max:{data && Math.round(temp['max'])}°</Card>;
}
