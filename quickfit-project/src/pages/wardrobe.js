import React, { useState, useEffect } from "react";

// Custom component imports
import Header from "@/components/Header";
import BottomNavigationContainer from "@/components/BottomNavigationContainer";
import WardrobeDialog from "@/components/WardrobeDialog.js";

export default function Wardrobe() {

  return (
    <>
      {/* 1. Header section */}
      <section>
        <Header />
      </section>

      {/* 2. Content section */}
      <section>
        <WardrobeDialog/>
      </section>

      {/* 3. NavBar section */}
      <section>
        <BottomNavigationContainer />
      </section>
    </>
  );
}
