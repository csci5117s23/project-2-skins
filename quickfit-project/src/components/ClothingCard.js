// MUI Component imports
import {
  Box,
  Card,
  Chip,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

export default function ClothingCard(props) {
  const { clothes } = props;

  // Dont render if theres no clothes
  if (!clothes) {
    return <></>;
  }

  return (
    <>
      <CssBaseline/>
        <Card 
          sx={{ display: "flex" }} 
        >
          <Grid
            container
            sx={{
              width: { xs: "100%", md: "70vw" },
              height: { xs: "100%", md: "100%" },
            }}
            justifyContent="space-between"
          >
            <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start">
              <Box ml={1.5} mt={0.2}>
                <Box>
                    <Typography sx={{ fontSize: { xs: 20, md: 28 } }} >{clothes["name"]}</Typography>
                </Box>
                <Box >
                  <Typography sx={{ fontSize: { xs: 15, md: 25 } }} gutterBottom component="div" color="text.secondary">
                    {clothes["category"]}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    transform: {xs:"scale(.8) translate(-15%)", md:"scale(1)"} ,
                    width:{xs:"50vw", md:"100%"},
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {clothes["tags"]?.map((tag) => {
                    return (
                      <Chip
                        key={tag + clothes._id + String(Math.random(500000))}
                        varient="outlined"
                        label={tag}
                        size="small"
                        sx={{ mt: 0.25, mr: 0.25, backgroundColor: "#DDD" }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                { (clothes.imageUrl !== "" || clothes.imageUrl !== undefined) &&
                  <Box
                    component="img"
                    sx={{
                      backgroundColor: "#000000",
                      maxWidth: { xs: "15vh", md: "25vh"},
                      maxHeight: { xs: "100%" },
                    }}
                    src={clothes["imageUrl"]}
                    alt="Clothing Image"
                  /> 
                }
                </Box>
            </Grid>
          </Grid>
        </Card>

    </>
  );
}
