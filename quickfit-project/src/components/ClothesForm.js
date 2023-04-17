import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import {
  Box,
  Stack,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";

export default function ClothesForm() {
  const { userId, getToken } = useAuth();
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  //TODO:use these states to hold tag values onChange and onKeypress
  // const [newTag, setNewTag] = useState("");
  // const [tagList, setTagList] = useState("");
  // const API_ENDPOINT = "https://todobackend-fm9y.api.codehooks.io/dev";

  async function addClothes() {
    const token = await getToken({ template: "codehooks" });

    // if category or name is empty, dont post
    if (category === "" || name === "") {
      return;
    }
    const response = await fetch(
      "https://todobackend-fm9y.api.codehooks.io/dev/clothes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          category: category,
          clothingName: name,
          tags: [color],
          createdOn: new Date(),
        }),
      }
    );
    console.log(response);
  }

  return (
    <>
      <Card>
        <Stack spacing={1} m={2} height="100vh">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <MenuItem value={"top"}>Top</MenuItem>
              <MenuItem value={"sweater"}>Sweater</MenuItem>
              <MenuItem value={"bottom"}>Bottoms</MenuItem>
              <MenuItem value={"jacket"}>Jacket</MenuItem>
              <MenuItem value={"shoes"}>Shoes</MenuItem>
              <MenuItem value={"accessories"}>Accessories</MenuItem>
              <MenuItem value={"onepiece"}>One Piece</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Color"
            variant="outlined"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Press Enter for more tags"
              />
            )}
          />
          <Button variant="outlined" onClick={addClothes}>
            Submit
          </Button>
        </Stack>
      </Card>
    </>
  );
}
