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
} from "@mui/material";

export default function ClothingCard(props) {
  const { clothes } = props;
  const handleDelete = () => {
    console.info("Implement deleting the chip/tag when coming here later");
  };
  // Dont render if theres no clothes
  if(!clothes){
    return <></>
  }
  
  return (
    <Stack alignItems="center" spacing={2} mt={0.5}>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 140, backgroundColor:'gray' }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={clothes["clothingName"]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {clothes["category"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {clothes["clothingName"]}
          </Typography>
          <Stack direction="row" spacing={1} width={300}>
            {clothes["tags"]?.map((tag) => {
              return (
                <Chip label={tag} variant="outlined" onDelete={handleDelete} />
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
