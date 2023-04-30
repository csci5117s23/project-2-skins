import * as React from "react";
import 
{Avatar,
 Button,
 CssBaseline,
 TextField,
 FormControlLabel,
 Checkbox,
 Link,
 Grid,
 Box,
 Typography,
 Container,
} 
from "@mui/material";


import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { green, purple, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ClerkProvider,
  SignUp,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"; // Clerk authorization imports

import Header from "@/components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[300],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function SignInPage() {
  return (
    // <ThemeProvider theme={theme}>
    <Box sx={{ height: "100vh" }}>
      <CssBaseline />
      <Header />

      <Container sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <SignIn />
      </Container>
    </Box>
    // </ThemeProvider>
  );
}
