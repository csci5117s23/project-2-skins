import {useState} from "react";
import { redirect } from "next/navigation";
// MUI Component imports
import {
  CssBaseline,
  Typography,
  Box,
  Card,
  Chip,
  Grid,
} from "@mui/material";
import {
  useCloudDownloadLatest
} from "@/modules/imageFunctions"

export default function ClothingCard(props) {
  const { clothes } = props;  
  const [image, setImage] = useState(<span>Loading...</span>);

  async function downloadImage() {
    const src = await useCloudDownloadLatest();
    setImage(<Box src={src} component="img"
      sx={{
        backgroundColor: "#000000",
        maxWidth: { xs: "15vh", md: "25vh"},
        maxHeight: { xs: "100%" },
      }}
      width={500} height={500} />
    );
  }


  // Dont render if theres no clothes
  if (!clothes) {
    return <></>;
  }

  return (
    <>
      <CssBaseline/>
      
      <Card 
        sx={{ display: "flex" }} 
        // onClick={handleClickOpen} 
      >
        <Grid
          container
          sx={{
            width: { xs: "90vw", md: "70vw" },
            height: { xs: "100%", md: "100%" },
          }}
          justifyContent="space-between"
        >
          <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start">
            <Box ml={1.5} mt={0.2}>
              <Box sx={{ fontSize: { xs: 20, md: 30 } }}>
                  <Typography>{clothes["name"]}</Typography>
              </Box>
              <Box sx={{ fontSize: { xs: 15, md: 25 } }}>
                <Typography gutterBottom component="div" color="text.secondary">
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
              {/* {image} */}
              <Box
                component="img"
                sx={{
                  backgroundColor: "#000000",
                  maxWidth: { xs: "15vh", md: "25vh"},
                  maxHeight: { xs: "100%" },
                }}
                src="https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z905315d66103c2ae8e7c0f1a_f1039a75974026af5_d20230501_m005334_c005_v0501002_t0038_u01682902414113"
                alt="Clothing Image"
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
