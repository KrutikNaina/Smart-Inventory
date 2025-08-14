// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import LiveDemo from "./components/LiveDemo";
import KPIBar from "./components/KPIBar";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Dashboard from "./components/pages/Dashboard";
import InventoryPage from "./components/inventory/InventoryPage";
import Orders from "./components/pages/Orders";
import AdminSettings from "./components/pages/AdminSettings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-white">
        <Routes>
          {/* Landing */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Features />
                <HowItWorks />
                <LiveDemo />
                <KPIBar />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* NEW: Inventory Page */}
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin-setting" element={<AdminSettings />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
