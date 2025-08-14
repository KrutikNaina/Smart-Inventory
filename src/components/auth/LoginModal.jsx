import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginCard from "./LoginCard";

export default function LoginModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* click outside to close */}
          <div
            className="absolute inset-0"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10"
          >
            <LoginCard onGoogle={() => Promise.resolve()} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
