import { useState, useEffect } from "react";
// MUI Component imports
import {
  Stack,
  TextField,
} from "@mui/material";

export default function SearchBar(props) {
  const { setSearch, color } = props;
  return (
    <Stack alignItems="center">
      <TextField
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        onChange={(e) => {
          setSearch ? setSearch(e.target.value) : null;
          console.log(e.target.value);
        }}
        sx={{
          margin: "1em",
          input: { color: color },
          label: { color: color },
          width: { md: "35vw" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: color,
            },
            "&.Mui-focused fieldset": {
              borderColor: color,
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused ": {
              color: color,
            },
          },
        }}
      ></TextField>
    </Stack>
  );
}
