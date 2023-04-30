import * as React from "react";
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
  Modal,
  Container,
  IconButton,
  MenuIcon,
  MenuItem,
  Tooltip,
  Avatar,
  Grid,
  Toolbar,
  Menu,
} from "@mui/material";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import AdbIcon from "@mui/icons-material/Adb";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

function ResponsiveAppBar() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100vw"
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="center" alignItems="center" textAlign="right">
              <Typography
                variant="h6"
                noWrap
                onClick={() => {
                  router.push("/");
                }}
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#3C3F42",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                QUICKFITS
              </Typography>
              <CheckroomRoundedIcon
                sx={{
                  mr: 1,
                  fontWeight: 700,
                  color: "#3C3F42",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end" sx={{ mr: 1, paddingRight: 1 }}>
              <UserButton />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
