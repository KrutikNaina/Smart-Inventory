// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user")) || { role: "Guest" };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-emerald-500/20 text-emerald-400 font-medium"
        : "hover:bg-white/10 text-neutral-300"
    }`;

  const NavLinks = () => (
    <>
      <NavLink to="/dashboard" className={navLinkClasses} onClick={() => setIsOpen(false)}>
        <LayoutDashboard className="h-5 w-5" /> Dashboard
      </NavLink>

      <NavLink to="/inventory" className={navLinkClasses} onClick={() => setIsOpen(false)}>
        <Boxes className="h-5 w-5" /> Inventory
      </NavLink>

      <NavLink to="/orders" className={navLinkClasses} onClick={() => setIsOpen(false)}>
        <ClipboardList className="h-5 w-5" /> Orders
      </NavLink>

      {currentUser.role === "Admin" && (
        <NavLink to="/admin" className={navLinkClasses} onClick={() => setIsOpen(false)}>
          <Shield className="h-5 w-5" /> Admin Panel
        </NavLink>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-neutral-900 p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
          <span className="text-white font-bold">SmartInventory</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="p-1 hover:bg-white/10 rounded-lg transition"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-neutral-900 border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo (desktop) */}
        <div className="hidden md:flex p-6 items-center gap-2 border-b border-white/10">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
          <span className="text-white font-bold tracking-tight">SmartInventory</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLinks />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10 text-red-400"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
