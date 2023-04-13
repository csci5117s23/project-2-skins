import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { green, purple, yellow } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ClerkProvider, SignUp, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";   // Clerk authorization imports

import Header from '@/components/Header'

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
        <Box sx={{ height: '100vh' }}>
        <CssBaseline />
            <Header/>

            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10}}>

                <SignIn/>
            </Container>
        </Box>
    // </ThemeProvider>
  );
}