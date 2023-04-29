import React, { useState } from "react";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import SignInPage from "@/components/SignInPage";
import {createTheme, ThemeProvider} from '@mui/material'
import "@/styles/globals.css";
import "@/styles/layout.css";

const theme = createTheme({
  palette:{
    primary:{
      main: "#ffd83d"
    },
    background:{
      default: "#3C3F42"
    },
    text:{
      primary: "#3C3F42"
    },
  },
  typography: {
    "fontFamily": `"Poppins"`,
  },
})

export default function App({ Component, pageProps }) {
  const [date, setDate] = useState(new Date());
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Get the pathname
  const { pathname } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <ClerkProvider {...pageProps} publishableKey={clerkPubKey}>
        <SignedIn>
          <Component {...pageProps} date={date} setDate={setDate} />
        </SignedIn>
        <SignedOut>
          <SignInPage />
        </SignedOut>
      </ClerkProvider>
    </ThemeProvider>



  );
}
