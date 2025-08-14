import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  QrCode,
  Printer,
  ArrowUpDown,
  Menu,
  X
} from "lucide-react";
import InventoryTable from "./InventoryTable";
import QRModal from "./QRModal";
import useDebounce from "../utils/useDebounce";
import Sidebar from "../Sidebar";

const seed = [
  { id: 1, sku: "SKU-100001", name: "Organic Oats 1kg", category: "Grocery", price: 4.99, stock: 56, updatedAt: "2025-08-12T10:15:00Z" },
  { id: 2, sku: "SKU-100002", name: "Almond Milk 1L", category: "Beverages", price: 2.49, stock: 18, updatedAt: "2025-08-13T08:04:00Z" },
  { id: 3, sku: "SKU-100003", name: "Dark Chocolate 70%", category: "Snacks", price: 1.99, stock: 7, updatedAt: "2025-08-14T09:12:00Z" },
  { id: 4, sku: "SKU-100004", name: "Olive Oil 500ml", category: "Grocery", price: 6.5, stock: 34, updatedAt: "2025-08-14T18:20:00Z" },
  { id: 5, sku: "SKU-100005", name: "Protein Bar - Peanut", category: "Snacks", price: 1.25, stock: 0, updatedAt: "2025-08-14T12:30:00Z" },
  { id: 6, sku: "SKU-100006", name: "Sparkling Water 330ml", category: "Beverages", price: 0.89, stock: 99, updatedAt: "2025-08-11T06:02:00Z" },
  { id: 7, sku: "SKU-100007", name: "Basmati Rice 5kg", category: "Grocery", price: 12.0, stock: 12, updatedAt: "2025-08-10T16:42:00Z" },
  { id: 8, sku: "SKU-100008", name: "Trail Mix 250g", category: "Snacks", price: 3.49, stock: 23, updatedAt: "2025-08-09T14:21:00Z" },
  { id: 9, sku: "SKU-100009", name: "Green Tea 20 bags", category: "Beverages", price: 2.99, stock: 65, updatedAt: "2025-08-08T11:50:00Z" },
  { id: 10, sku: "SKU-100010", name: "Greek Yogurt 400g", category: "Dairy", price: 2.15, stock: 9, updatedAt: "2025-08-07T09:28:00Z" },
];

const categories = ["All", "Grocery", "Beverages", "Snacks", "Dairy"];
const stockFilters = ["All", "In Stock", "Low", "Out"];

export default function InventoryPage() {
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [stockView, setStockView] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "updatedAt", dir: "desc" });
  const [qrItem, setQrItem] = useState(null);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageSize = 8;
  const debouncedQ = useDebounce(q, 250);

  const filtered = useMemo(() => {
    return rows
      .filter((r) => {
        if (!debouncedQ) return true;
        const s = debouncedQ.toLowerCase();
        return r.sku.toLowerCase().includes(s) || r.name.toLowerCase().includes(s);
      })
      .filter((r) => (category === "All" ? true : r.category === category))
      .filter((r) => {
        if (stockView === "All") return true;
        if (stockView === "In Stock") return r.stock > 15;
        if (stockView === "Low") return r.stock > 0 && r.stock <= 15;
        if (stockView === "Out") return r.stock === 0;
        return true;
      })
      .sort((a, b) => {
        const dir = sortBy.dir === "asc" ? 1 : -1;
        const k = sortBy.key;
        if (k === "price" || k === "stock") return (a[k] - b[k]) * dir;
        if (k === "updatedAt") return (new Date(a[k]) - new Date(b[k])) * dir;
        return String(a[k]).localeCompare(String(b[k])) * dir;
      });
  }, [rows, debouncedQ, category, stockView, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key) {
    setSortBy((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  }

  async function onInlineSave(id, patch) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    await new Promise((res) => setTimeout(res, 500));
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, updatedAt: new Date().toISOString() } : r))
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Sidebar */}
      <div className="lg:hidden p-4">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar (desktop & mobile overlay) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-neutral-900 p-4 transition-transform lg:relative lg:translate-x-0 lg:w-64 w-64
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 relative overflow-hidden">
        <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-neutral-950/60 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
            <span className="text-white font-bold tracking-tight">SmartInventory</span>
          </div>
          <div className="text-sm text-neutral-300">Inventory</div>
        </header>

        {/* Controls */}
        <section className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 min-w-[220px]">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                className="w-full bg-transparent outline-none text-sm placeholder:text-neutral-500"
                placeholder="Search by SKU or name…"
              />
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-400" />
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Stock filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-400" />
              <select
                value={stockView}
                onChange={(e) => { setStockView(e.target.value); setPage(1); }}
                className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm"
              >
                {stockFilters.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="sm:ml-auto flex items-center gap-2">
              <button
                onClick={() => toggleSort("updatedAt")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
              >
                <ArrowUpDown className="h-4 w-4" />
                Updated
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 rounded-2xl border border-white/10 overflow-x-auto">
            <InventoryTable
              rows={pageRows}
              sortBy={sortBy}
              onSort={toggleSort}
              onEdit={onInlineSave}
              onShowQR={(item) => setQrItem(item)}
            />
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-sm text-neutral-400 gap-3">
            <div>
              Showing{" "}
              <span className="text-white">
                {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filtered.length)}
              </span>{" "}
              of <span className="text-white">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5"
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="px-2">{page} / {pageCount}</span>
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5"
                disabled={page === pageCount}
              >
                Next
              </button>
            </div>
          </div>
        </section>

        {/* QR Modal */}
        {qrItem && <QRModal item={qrItem} onClose={() => setQrItem(null)} />}
      </main>
    </div>
  );
}
