import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./Pages/Dashboard";
import Features from "./components/Features";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
