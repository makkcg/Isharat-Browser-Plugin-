"use client";

import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

// Home Page
export default function Home() {
  const { languageLoaded } = useContext(AppContext);
  if (!languageLoaded) return "";
  return (
    <main>
      <h1>Dahboard Home</h1>
    </main>
  );
}
