import React from "react";
// import styles from '@/styles/Home.module.css'

import DateWeatherWidget from "@/components/DateWeatherWidget";

import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import CalenderCard from "@/components/CalenderCard";
// Load any necessary ENV variables
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function Calender() {
  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
        <DateWeatherWidget date={new Date()} />
      </section>

      {/* 2. Content section */}
      <section>
        <CalenderCard />
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer />
      </section>
    </>
  );
}
