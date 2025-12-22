import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./Pages/Dashboard";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
