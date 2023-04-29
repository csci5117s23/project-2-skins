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
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => {
                router.push("/");
              }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#3C3F42",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              QUICKFIT
            </Typography>
          </Box>

          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              ml: "15vw",
              width: "100vw",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => {
                router.push("/");
              }}
              sx={{
                cursor: "pointer",
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#3C3F42",
                textDecoration: "none",
              }}
            >
              QUICKFIT
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <UserButton />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
