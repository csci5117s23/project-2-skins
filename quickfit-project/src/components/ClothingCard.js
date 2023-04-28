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
    // <Stack alignItems="center" spacing={2} mt={0.5}>
    //   <Card
    //     sx={{
    //       display: 'flex',
    //       width: "43vw",
    //       "@media (min-width: 800px)": {
    //         width: "30vw",
    //       },
    //     }}
    //   >
    //     <Stack direction="row">
    //     <CardContent>
    //       <Typography variant="h5">{clothes["clothingName"]}</Typography>
    //       <Typography
    //         gutterBottom
    //         variant="body2"
    //         component="div"
    //         color="text.secondary"
    //       >
    //         {clothes["category"]}
    //       </Typography>
    //       <Grid container>
    //         {clothes["tags"]?.map((tag) => {
    //           return (
    //             <Grid item xs="auto">
    //               <Chip
    //                 label={tag}
    //                 size="small"
    //                 variant="outlined"
    //                 onDelete={handleDelete}
    //               />
    //             </Grid>
    //           );
    //         })}
    //       </Grid>
    //     </CardContent>
    //     <Box
    //       sx={{ height: 140, backgroundColor: "gray" }}
    //     />

    //     </Stack>
    //   </Card>
    // </Stack>

    <Card sx={{ display: "flex" }}>
      <Grid container width="80vw" justifyContent="space-between">
        <Grid item xs={7}>
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
        <Grid item xs={5}>
          <CardMedia
            component="img"
            sx={{ backgroundColor: "#000000", height: "100%", width: "100%" }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Clothing Image"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
