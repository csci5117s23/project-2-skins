import * as React from "react";
import {
  CardContent,
  CardMedia,
  Typography,
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
  Grid,
} from "@mui/material";

export default function ClothingCard(props) {
  const { clothes } = props;
  const handleDelete = () => {
    console.info("Implement deleting the chip/tag when coming here later");
  };
  // Dont render if theres no clothes
  if (!clothes) {
    return <></>;
  }

  return (
    <Card sx={{ display: "flex" }} >
      <Grid container width="80vw" justifyContent="space-between">
        <Grid item xs={6}>
            <CardContent>
              <Typography variant="h6">{clothes["clothingName"]}</Typography>
              <Typography
                gutterBottom
                component="div"
                color="text.secondary"
                variant="h7"
              >
                {clothes["category"]}
              </Typography>
              <Grid container>
                {clothes["tags"]?.map((tag) => {
                  return (
                    <Grid item xs="auto">
                      <Chip
                        label={tag}
                        size="small"
                        variant="outlined"
                        onDelete={handleDelete}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
        </Grid>
        <Grid item xs={6} >
          <Box display="flex" justifyContent="flex-end" >
          <Box
            component="img"
            sx={{ backgroundColor: "#000000", height: "100%", maxHeight:{xs:"20vh"} }}
            src="https://www.babyshop.com/images/1063852/card_xlarge.jpg"
            alt="Clothing Image"
          />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
