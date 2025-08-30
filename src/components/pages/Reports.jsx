// src/pages/Reports.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, Package, AlertTriangle, ClipboardList } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const navigate = useNavigate();

  // Dummy chart data
  const data = [
    { month: "Jan", inventory: 120, orders: 40 },
    { month: "Feb", inventory: 100, orders: 60 },
    { month: "Mar", inventory: 80, orders: 30 },
    { month: "Apr", inventory: 90, orders: 50 },
    { month: "May", inventory: 110, orders: 70 },
    { month: "Jun", inventory: 95, orders: 65 },
  ];

  // Summary cards with route paths
  const summary = [
    {
      title: "Total Items",
      value: "1,240",
      icon: <Package className="h-6 w-6 text-emerald-400" />,
      route: "/inventory",
    },
    {
      title: "Low Stock",
      value: "18",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
      route: "/inventory?filter=low",
    },
    {
      title: "Orders Processed",
      value: "320",
      icon: <ClipboardList className="h-6 w-6 text-blue-400" />,
      route: "/orders",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Reports & Analytics
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium">
          <Download size={18} /> Download Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summary.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.route)}
            className="p-4 bg-neutral-900 border border-white/10 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition"
          >
            <div className="p-3 rounded-lg bg-neutral-800">{item.icon}</div>
            <div>
              <p className="text-sm text-neutral-400">{item.title}</p>
              <p className="text-xl font-semibold text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="p-6 bg-neutral-900 border border-white/10 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Inventory & Orders Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="inventory"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
