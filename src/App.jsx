import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import Analytics from "./Pages/Analytics";
import TaskManager from "./Pages/TaskManager";
import Goals from "./Pages/Goals";
import Notes from "./Pages/Notes";
import Habits from "./Pages/Habits";
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
      <Route path="/settings" element={<Settings />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/tasks" element={<TaskManager />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/habits" element={<Habits />} />
    </Routes>
  );
}
