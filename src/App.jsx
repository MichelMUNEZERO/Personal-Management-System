import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
