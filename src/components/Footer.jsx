// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
            <span className="text-white font-bold tracking-tight">
              SmartInventory
            </span>
          </div>
          <p className="mt-3 text-sm">
            QR-powered inventory for modern retail. Built with MERN.
          </p>
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

        <div className="md:text-right text-sm text-neutral-500">
          © {new Date().getFullYear()} SmartInventory Inc.
        </div>
      </div>
    </footer>
  );
}
