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
    <Stack alignItems="center" spacing={2} mt={0.5}>
      <Card
        sx={{
          width: "43vw",
          "@media (min-width: 800px)": {
            width: "30vw",
          },
        }}
      >
        <CardMedia
          sx={{ height: 140, backgroundColor: "gray" }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={clothes["clothingName"]}
        />
        <CardContent>
          <Typography variant="h5">{clothes["clothingName"]}</Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            color="text.secondary"
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
      </Card>
    </Stack>
  );
}
