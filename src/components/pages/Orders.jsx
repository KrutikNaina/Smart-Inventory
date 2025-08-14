// src/pages/Orders.jsx
import React, { useState } from "react";
import { Search, Filter, QrCode } from "lucide-react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Sidebar from "../Sidebar";

export default function Orders() {
  const [scanOpen, setScanOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");

  const orders = [
    { id: "ORD-1001", customer: "John Doe", items: 3, total: "$125.50", status: "New", date: "2025-08-14" },
    { id: "ORD-1002", customer: "Sarah Lee", items: 5, total: "$320.00", status: "In Progress", date: "2025-08-13" },
    { id: "ORD-1003", customer: "Mike Ross", items: 2, total: "$80.00", status: "Fulfilled", date: "2025-08-12" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "New": return "bg-emerald-500/20 text-emerald-400";
      case "In Progress": return "bg-amber-500/20 text-amber-400";
      case "Fulfilled": return "bg-blue-500/20 text-blue-400";
      default: return "bg-neutral-500/20 text-neutral-400";
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <Sidebar />
      <main className="relative flex-1 min-h-screen overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-neutral-950/60">
          <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
              <span className="text-white font-bold tracking-tight">Orders</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="flex items-center justify-center gap-1 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Filter className="h-4 w-4" /> Filter
              </button>
              <button
                onClick={() => setScanOpen(true)}
                className="flex items-center justify-center gap-1 text-sm bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/40 hover:bg-emerald-500/30 transition"
              >
                <QrCode className="h-4 w-4" /> Scan Order
              </button>
            </div>
          </nav>
        </header>

        {/* Search */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full sm:max-w-sm">
            <Search className="h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="bg-transparent outline-none text-sm flex-1 px-2"
            />
          </div>
        </div>

        {/* Table */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pb-6">
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="min-w-full text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.customer}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Scanner Modal */}
        {scanOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-neutral-900 rounded-2xl border border-white/10 p-6 relative w-full max-w-md">
              <button
                onClick={() => setScanOpen(false)}
                className="absolute top-2 right-2 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold mb-4">Scan Order QR/Barcode</h2>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <BarcodeScannerComponent
                  width={"100%"}
                  height={250}
                  onUpdate={(err, result) => {
                    if (result) {
                      setScannedCode(result.text);
                    }
                  }}
                />
              </div>
              {scannedCode && (
                <div className="mt-4 p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-sm">
                  ✅ Scanned Code: <span className="font-mono">{scannedCode}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
