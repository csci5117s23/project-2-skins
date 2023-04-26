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
  Modal
} from "@mui/material";
import CalenderCard from './CalenderCard';

export default function DateWeatherWidget(props) {
  const { date } = props;
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
        <Card onClick={handleOpen} sx={{ backgroundColor: "#FFFFFF", margin: "1.5vh" }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            minHeight="8vh"
            direction="row"
            sx={{ cursor: 'pointer' }}
          >
            <WeatherCard date={date ? date : new Date()} />
            <Divider orientation="vertical" variant="middle" flexItem />
            <DateCard date={date ? date : new Date()} />
          </Stack>
        </Card>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box >
          <CalenderCard></CalenderCard>
        </Box>
      </Modal>
    </>
  );
}
