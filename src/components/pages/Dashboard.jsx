import React from "react";
import {
  ShoppingCart,
  Package,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../Sidebar";

export default function Dashboard() {
  const kpis = [
    { icon: <Package className="h-5 w-5" />, label: "Total Products", value: "1,248" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders Today", value: "152" },
    { icon: <AlertTriangle className="h-5 w-5 text-amber-400" />, label: "Low Stock", value: "8" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "Stock Accuracy", value: "99.4%" },
  ];

  const data = [
    { name: "Mon", stock: 94 },
    { name: "Tue", stock: 96 },
    { name: "Wed", stock: 92 },
    { name: "Thu", stock: 98 },
    { name: "Fri", stock: 97 },
    { name: "Sat", stock: 99 },
    { name: "Sun", stock: 95 },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />


        {/* Page Content */}
        <div className="relative px-4 md:px-6 py-6 md:py-10 max-w-7xl mx-auto">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((k, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-1"
              >
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  {k.icon}
                  {k.label}
                </div>
                <div className="text-xl font-bold">{k.value}</div>
              </div>
            ))}
          </div>

          {/* Live Chart */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
