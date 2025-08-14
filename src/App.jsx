// import React from "react";
// import LandingPage from "./components/pages/LandingPage";
// import "./index.css"; // Tailwind styles

// export default function App() {
//   return (
//     <div className="font-sans antialiased">
//       <LandingPage />
//     </div>
//   );
// }

// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import LiveDemo from "./components/LiveDemo";
import KPIBar from "./components/KPIBar";
import Footer from "./components/Footer";
import Login from "./components/Login";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* <lamding lage> */}
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <LiveDemo />
      <KPIBar />
      <Footer />

      {/* <Login /> */}
    </div>
  );
}
