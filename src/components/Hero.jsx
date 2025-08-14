import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  ScanLine,
  ShoppingCart,
  Database,
  Zap,
  ShieldCheck,
  ArrowRight,
  Box,
  BarChart3,
  Clock,
} from "lucide-react";
import QRCode from "qrcode";



// ---------- HERO WITH QR SCANNER PORTAL ----------
function ScanPortal() {
  // purely visual: sweeping beam animation using framer-motion
  return (
    <div className="relative w-full h-[380px] md:h-[440px] rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b from-neutral-900 to-black">
      {/* gate frame */}
      <div className="absolute inset-x-8 top-6 h-3 rounded-full bg-white/10" />
      {/* vertical posts */}
      <div className="absolute left-8 top-6 bottom-6 w-2 rounded-full bg-white/10" />
      <div className="absolute right-8 top-6 bottom-6 w-2 rounded-full bg-white/10" />

      {/* repeating QR tiles moving towards viewer */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-40 h-40 md:w-44 md:h-44 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center"
          initial={{ y: 260, opacity: 0.0, scale: 0.8 }}
          animate={{ y: -120, opacity: 1, scale: 1 }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
        >
          <QrCode className="h-16 w-16 text-white/80" />
        </motion.div>
      ))}

      {/* sweeping beam */}
      <motion.div
        className="absolute inset-x-16 h-16 rounded-2xl"
        style={{ background: "radial-gradient(100% 100% at 50% 50%, rgba(34,197,94,0.35) 0%, rgba(34,197,94,0.12) 55%, transparent 70%)" }}
        initial={{ top: 40 }}
        animate={{ top: [40, 340, 40] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* bottom glow */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-emerald-500/20 to-transparent" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 pt-20 pb-10 md:pt-28 md:pb-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 text-xs text-neutral-300">
            <ScanLine className="h-3.5 w-3.5" /> Live QR Scanning Demo
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Scan. Track. Simplify.
          </h1>
          <p className="mt-5 text-neutral-300 text-lg">
            Your staff scans QR codes; we handle real‑time product data, stock updates, and instant billing. Built on a blazing MERN stack.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-lg shadow-emerald-600/20">Get started free</button>
            <button className="px-5 py-3 rounded-xl border border-white/15 hover:bg-white/5">View API Docs</button>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure by default</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Sub‑second scans</div>
            <div className="flex items-center gap-2"><Database className="h-4 w-4" /> Mongo‑backed</div>
          </div>
        </div>
        <ScanPortal />
      </div>
    </section>
  );
}

// ---------- FEATURES GRID ----------
function Features() {
    const items = [
        {
          icon: <QrCode className="h-6 w-6" />,
          title: "QR-Code Powered",
          desc: "Each item gets a unique QR code with embedded metadata — scan to view, update, or track instantly."
        },
        {
          icon: <Database className="h-6 w-6" />,
          title: "Live Inventory Sync",
          desc: "MongoDB change streams ensure stock counts update in real time across all user devices."
        },
        {
          icon: <ShoppingCart className="h-6 w-6" />,
          title: "One-Tap Billing",
          desc: "Generate invoices instantly from scanned items. POS-ready exports for smooth checkout."
        },
        {
          icon: <Zap className="h-6 w-6" />,
          title: "Real-Time Alerts",
          desc: "Low stock? Expiry near? Get instant notifications via web & mobile push."
        },
        {
          icon: <ShieldCheck className="h-6 w-6" />,
          title: "Role-Based Access",
          desc: "Secure login with staff, admin, and auditor roles. Activity logs for full accountability."
        },
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: "Smart Analytics",
          desc: "Visual dashboards with sales trends, stock movement heatmaps, and predictive restocking."
        },
      ];
    

  return (
    <section className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-600/10 text-emerald-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- HOW IT WORKS ----------
function HowItWorks() {
  const steps = [
    { icon: <Box className="h-5 w-5" />, title: "1) Generate", desc: "Create QR codes for every product SKU with one click." },
    { icon: <ScanLine className="h-5 w-5" />, title: "2) Scan", desc: "Use the web app to scan and auto‑fetch product details." },
    { icon: <ShoppingCart className="h-5 w-5" />, title: "3) Bill", desc: "Items land in a virtual cart; export or post to POS instantly." },
  ];
  return (
    <section className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 p-6 bg-white/5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">{s.icon}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-neutral-300 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- LIVE DEMO (QR generator + preview) ----------
function useQRCodeCanvas(text) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    QRCode.toCanvas(canvas, text || "SKU-DEMO-0001", { width: 190, margin: 1 }, (err) => {
      if (err) console.error(err);
    });
  }, [text]);
  return ref;
}

function StockBar({ value }) {
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ duration: 0.6 }}
        className="h-full bg-gradient-to-r from-emerald-500 to-blue-600"
      />
    </div>
  );
}

function LiveDemo() {
  const [sku, setSku] = useState("INV-QR-0001");
  const [price, setPrice] = useState(2.49);
  const [stock, setStock] = useState(78);
  const canvasRef = useQRCodeCanvas(sku);

  // simple randomize for demo
  function randomize() {
    const n = Math.floor(100000 + Math.random() * 900000);
    setSku(`SKU-${n}`);
    setPrice((Math.random() * 50 + 1).toFixed(2));
    setStock(Math.floor(Math.random() * 100));
  }

  return (
    <section className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold">Try it in your browser</h2>
          <p className="mt-3 text-neutral-300 max-w-xl">
            Enter a SKU and we generate a QR you can scan with any device. The mock card on the right updates live with price and stock.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-neutral-400">Product / SKU</span>
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-emerald-500"
                placeholder="SKU-123456"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-neutral-400">Price ($)</span>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-neutral-400">Stock (%)</span>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Math.max(0, Math.min(100, Number(e.target.value))))}
                className="px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-emerald-500"
              />
            </label>
            <div className="flex items-end">
              <button onClick={randomize} className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15">Randomize</button>
            </div>
          </div>

          <div className="mt-6 text-sm text-neutral-400">PS: This generates client-side only—no server needed.</div>
        </div>

        {/* QR + Product card */}
        <div className="rounded-3xl border border-white/10 p-6 bg-gradient-to-b from-white/5 to-transparent">
          <div className="grid sm:grid-cols-[200px,1fr] gap-6 items-center">
            <div className="rounded-2xl bg-white p-3 flex items-center justify-center">
              <canvas ref={canvasRef} className="[image-rendering:pixelated]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified SKU
              </div>
              <h3 className="mt-2 text-xl font-semibold text-white">{sku}</h3>
              <div className="mt-1 text-neutral-300">Grocery • Packaged • Ambient</div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-neutral-400">Price</div>
                  <div className="text-white font-semibold mt-1">${Number(price).toFixed(2)}</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-neutral-400">Stock</div>
                  <div className="text-white font-semibold mt-1">{stock}%</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-neutral-400">Status</div>
                  <div className="text-white font-semibold mt-1">{stock > 15 ? "In Stock" : "Low"}</div>
                </div>
              </div>

              <div className="mt-5">
                <StockBar value={stock} />
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">Add to Cart</button>
                <button className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- KPI STRIP ----------
function KPIBar() {
  const kpis = [
    { label: "Avg. scan → cart", value: "0.8s" },
    { label: "Stock accuracy", value: "99.4%" },
    { label: "SKU coverage", value: "100%" },
    { label: "Downtime", value: "< 0.01%" },
  ];
  return (
    <section className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="rounded-2xl border border-white/10 p-4 bg-white/5">
            <div className="text-neutral-400 text-xs">{k.label}</div>
            <div className="text-xl font-bold mt-1">{k.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
            <span className="text-white font-bold tracking-tight">SmartInventory</span>
          </div>
          <p className="mt-3 text-sm">QR-powered inventory for modern retail. Built with MERN.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-white font-semibold mb-2">Product</div>
            <ul className="space-y-1">
              <li>Features</li>
              <li>Docs</li>
              <li>Changelog</li>
              <li>Status</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-2">Company</div>
            <ul className="space-y-1">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="md:text-right text-sm text-neutral-500">© {new Date().getFullYear()} SmartInventory Inc.</div>
      </div>
    </footer>
  );
}

// ---------- PAGE ----------
export default function SmartInventoryLanding() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      {/* <Features /> */}
      {/* <HowItWorks /> */}
      {/* <LiveDemo /> */}
      {/* <KPIBar /> */}
      {/* <Footer /> */}
    </main>
  );
}
