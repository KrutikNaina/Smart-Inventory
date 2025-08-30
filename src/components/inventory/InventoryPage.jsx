// src/components/inventory/InventoryPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const InventoryPage = () => {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState(""); // e.g., "inStock" or "outOfStock"
  const [sortBy, setSortBy] = useState({ key: "name", dir: "asc" });

  // Fetch inventory
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token"); // Auth token
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched rows:", res.data);
        setRows(res.data);
      } catch (err) {
        console.error("AxiosError", err);
      }
    };
    fetchInventory();
  }, []);

  // Filter + sort rows
  const filteredRows = useMemo(() => {
    let data = [...rows];

    // Search
    if (q) {
      data = data.filter(
        (row) =>
          row.name.toLowerCase().includes(q.toLowerCase()) ||
          row.sku.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      data = data.filter((row) => row.category === categoryFilter);
    }

    // Stock filter
    if (stockFilter) {
      if (stockFilter === "inStock") data = data.filter((row) => row.stock > 0);
      if (stockFilter === "outOfStock") data = data.filter((row) => row.stock === 0);
    }

    // Sorting
    data.sort((a, b) => {
      const aValue = a[sortBy.key];
      const bValue = b[sortBy.key];

      if (aValue < bValue) return sortBy.dir === "asc" ? -1 : 1;
      if (aValue > bValue) return sortBy.dir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [rows, q, categoryFilter, stockFilter, sortBy]);

  const toggleSort = (key) =>
    setSortBy((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );

  return (
    <div className="min-h-screen p-6 bg-neutral-900 text-white flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Inventory</h1>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-neutral-400" />
          <input
            placeholder="Search SKU or name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm outline-none"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm outline-none"
        >
          <option value="">All Stock</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-neutral-700">
          <thead>
            <tr>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("name")}
              >
                Name
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("category")}
              >
                Category
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("sku")}
              >
                SKU
              </th>
              <th>Description</th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("stock")}
              >
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <tr key={row._id} className="border-t border-neutral-700">
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.category}</td>
                  <td className="px-4 py-2">{row.sku}</td>
                  <td className="px-4 py-2">{row.description}</td>
                  <td className="px-4 py-2">{row.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-neutral-400">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
