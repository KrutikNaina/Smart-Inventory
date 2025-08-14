import React from "react";
import { motion } from "framer-motion";
import PortalScene from "../3d/portal/PortalScene";

export default function HeroPortal() {
  return (
    <section className="w-full min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 sm:px-10 lg:px-16 bg-[#f4f6fa] dark:bg-gray-900">
      {/* LEFT COPY */}
      <div>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          QR Scanner <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">Portal</span>
        </motion.h1>

        <motion.p
          className="mt-5 text-lg text-gray-700 dark:text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Watch products glide through an automated scanning gate. Real-time QR validation lights up when items pass the beam—fast, accurate, and delightful.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            🚀 Start Scanning
          </button>
          <button className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100/60 dark:hover:bg-gray-800/50">
            🎬 See Live Demo
          </button>
        </motion.div>
      </div>

      {/* RIGHT 3D */}
      <div className="h-[55vh] md:h-[65vh] lg:h-[75vh] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <PortalScene />
      </div>
    </section>
  );
}
