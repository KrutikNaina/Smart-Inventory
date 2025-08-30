// src/pages/AddOrder.jsx
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddOrder() {
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    supplier: "",
    orderDate: "",
    deliveryDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You are not logged in.");

      const payload = {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("✅ Order Added Successfully!");
        setForm({
          productName: "",
          quantity: "",
          price: "",
          supplier: "",
          orderDate: "",
          deliveryDate: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-neutral-950">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="h-7 w-7 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Add New Order
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-6 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Supplier
              </label>
              <input
                type="text"
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Order Date */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Order Date
              </label>
              <input
                type="date"
                name="orderDate"
                value={form.orderDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Delivery Date
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={form.deliveryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end items-center gap-4">
            <span className="text-green-400">{message}</span>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition"
            >
              {loading ? "Adding..." : "Add Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
