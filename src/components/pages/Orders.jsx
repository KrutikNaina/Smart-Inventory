// src/pages/Orders.jsx
import React, { useState } from "react";
import { Search, Filter, QrCode } from "lucide-react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Orders() {
  const [scanOpen, setScanOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");

  const orders = [
    {
      id: "ORD-1001",
      customer: "John Doe",
      items: 3,
      total: "$125.50",
      status: "New",
      date: "2025-08-14",
    },
    {
      id: "ORD-1002",
      customer: "Sarah Lee",
      items: 5,
      total: "$320.00",
      status: "In Progress",
      date: "2025-08-13",
    },
    {
      id: "ORD-1003",
      customer: "Mike Ross",
      items: 2,
      total: "$80.00",
      status: "Fulfilled",
      date: "2025-08-12",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "bg-emerald-500/20 text-emerald-400";
      case "In Progress":
        return "bg-amber-500/20 text-amber-400";
      case "Fulfilled":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-neutral-500/20 text-neutral-400";
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <main className="relative flex-1 min-h-screen overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold"></h1>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition">
                <Filter className="h-4 w-4" /> Filter
              </button>
              <button
                onClick={() => setScanOpen(true)}
                className="flex items-center gap-1 text-sm bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/40 hover:bg-emerald-500/30 transition"
              >
                <QrCode className="h-4 w-4" /> Scan Order
              </button>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-full sm:w-64">
                <Search className="h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="bg-transparent outline-none text-sm flex-1 px-2"
                />
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-white/10 text-left text-neutral-300">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`${
                      idx % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    } border-t border-white/10 hover:bg-white/10 transition`}
                  >
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3">{order.total}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Scanner Modal */}
        {scanOpen && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6">
    <div className="bg-neutral-900 rounded-2xl border border-white/10 p-4 sm:p-6 relative w-full max-w-md sm:max-w-lg shadow-xl">
      {/* Close Button */}
      <button
        onClick={() => setScanOpen(false)}
        className="absolute top-3 right-3 text-neutral-400 hover:text-white text-xl sm:text-2xl"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
        Scan Order QR/Barcode
      </h2>

      {/* QR Scanner */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <BarcodeScannerComponent
          width={"100%"}
          height={250}
          onUpdate={(err, result) => {
            if (result) setScannedCode(result.text);
          }}
        />
      </div>

      {/* Scanned Result */}
      {scannedCode && (
        <div className="mt-4 p-3 sm:p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-sm sm:text-base text-center flex flex-col items-center gap-1 break-all">
  <span className="text-emerald-400 font-semibold">✅ Scanned Code</span>
  <span className="font-mono text-white bg-neutral-900 px-2 py-1 rounded text-sm sm:text-base break-all">
    {scannedCode}
  </span>
</div>

      )}
    </div>
  </div>
)}

      </main>
    </div>
  );
}
