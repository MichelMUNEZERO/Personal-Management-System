import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPages from "./components/LandingPages";
import Login from "./Auth/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
