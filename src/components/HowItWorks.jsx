import React from "react";
import { Box, ScanLine, ShoppingCart, Database, Bell, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Box className="h-5 w-5" />,
      title: "1) Generate",
      desc: "Assign unique QR codes to each SKU with embedded metadata — product name, type, stock count, and expiry."
    },
    {
      icon: <ScanLine className="h-5 w-5" />,
      title: "2) Scan",
      desc: "Use mobile or web app to scan items. Instantly retrieve details from the MongoDB database in real time."
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "3) Bill",
      desc: "Scanned items appear in a virtual cart. Auto-calculate totals, apply discounts, and export to POS or PDF."
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "4) Alerts",
      desc: "Receive instant notifications for low stock, expired products, or maintenance schedules."
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "5) Update",
      desc: "Stock changes sync instantly across all devices via MongoDB change streams and WebSockets."
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "6) Analyze",
      desc: "View analytics dashboards with stock trends, sales heatmaps, and AI-based restocking predictions."
    },
  ];

  return (
    <section className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-neutral-300 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
