import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import SignInPage from "@/components/SignInPage";

import "@/styles/globals.css";
import "@/styles/layout.css";

export default function App({ Component, pageProps }) {
  // const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkPubKey =
    "pk_test_Z3Jvd2luZy1ha2l0YS0zOS5jbGVyay5hY2NvdW50cy5kZXYk";

  // Get the pathname
  const { pathname } = useRouter();

  return (
    <ClerkProvider {...pageProps} publishableKey={clerkPubKey}>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </ClerkProvider>
  );
}
