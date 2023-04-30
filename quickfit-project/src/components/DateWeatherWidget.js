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
  Stack,
  Divider,
  Modal,
} from "@mui/material";
import CalenderCard from "./CalenderCard";

export default function DateWeatherWidget({ date, setDate }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var d = new Date();
  var yesterday = d.setDate(d.getDate() - 1);
  var nextMonth = d.setDate(d.getDate() + 30);
  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          backgroundImage: "url(https://media.giphy.com/media/7Qq4PZoYc5XtDjArdM/giphy.gif)",
          backgroundSize: "25vh",
          backgroundColor: "#FFFFFF",
          margin: "1.5vh",
          "&:hover": {
            backgroundColor: "#f2f2f2", 
          },
          
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          minHeight="8vh"
          direction="row"
          sx={{ cursor: "pointer",  width: {xs:"90vw", md:"70vw"},}}
        >
          {date > yesterday && date < nextMonth ? (
            <>
              <Stack width={"50vw"} direction="row" alignItems="center"
          justifyContent="center">
                <WeatherCard date={date ? date : new Date()} />
              </Stack>
              <Divider orientation="vertical" variant="middle" flexItem />
            </>
          ) : (
            <></>
          )}
          <Stack width={"50vw"} direction="row" alignItems="center"
          justifyContent="center" >
            <DateCard date={date ? date : new Date()} />
          </Stack>
        </Stack>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box>
          <CalenderCard
            date={date}
            setDate={setDate}
            handleClose={handleClose}
          /> 
        </Box>
      </Modal>
    </>
  );
}
