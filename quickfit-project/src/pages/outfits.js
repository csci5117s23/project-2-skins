import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ClerkProvider, SignUp, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";   // Clerk authorization imports

const inter = Inter({ subsets: ['latin'] })

// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function OutfitsPage() {
  return (
    <>
        <div>Outfits page</div>
    </>
  )
}
