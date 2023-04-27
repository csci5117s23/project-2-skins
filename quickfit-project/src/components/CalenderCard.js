import * as React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Badge, Card, Box } from "@mui/material";

//reference: https://mui.com/x/react-date-pickers/date-calendar/
function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "✅" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

ServerDay.propTypes = {
  /**
   * The date to show.
   */
  day: PropTypes.object.isRequired,
  highlightedDays: PropTypes.arrayOf(PropTypes.number),
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
};

export default function CalenderCard(props) {
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const { date, setDate, handleClose } = props;

  const fetchHighlightedDays = (date) => {
    //TODO: get request for days that have outfits
  };

  React.useEffect(() => {
    fetchHighlightedDays(date);
  }, []);

  const handleMonthChange = (date) => {
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

const handleDateChange = (date) => {
    setDate(new Date(date));
    handleClose();
  };
  
  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={date ? dayjs(date) : dayjs(new Date())}
          onMonthChange={handleMonthChange}
          onChange={handleDateChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
    </Card>
  );
}
