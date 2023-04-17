import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignUp,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"; // Clerk authorization imports

import HomeLayout from "@/components/HomeLayout";


const inter = Inter({ subsets: ["latin"] });

// Load any necessary ENV variables
// const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const clerkPubKey = "pk_test_Z3Jvd2luZy1ha2l0YS0zOS5jbGVyay5hY2NvdW50cy5kZXYk";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomeLayout />
      </main>
    </>
  );
}
