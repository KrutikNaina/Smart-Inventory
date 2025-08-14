import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function ScanPortal3D() {
  const wrapRef = useRef(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    setXY({ x: (rx - 0.5) * 2, y: (ry - 0.5) * 2 });
  };
  const onLeave = () => setXY({ x: 0, y: 0 });

  const rotY = clamp(xy.x * 10, -12, 12);
  const rotX = clamp(-xy.y * 10, -12, 12);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full h-[500px]"
      style={{ perspective: 1600 }}
    >
      <motion.div
        className="relative w-full h-full rounded-[2rem] border border-emerald-400/30 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.4)] bg-black/80"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 140, damping: 16, mass: 0.8 }}
      >
        {/* BACKGROUND LAYERS */}
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            transform: "translateZ(-100px)",
            backgroundImage:
              "linear-gradient(to right, rgba(0,255,180,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,180,0.06) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPositionY: ["0px", "50px"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Circuit traces */}
        <motion.div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-60px)",
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(16,185,129,0.05) 50px), repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(16,185,129,0.05) 50px)",
          }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Side Rails */}
        <div className="absolute inset-x-8 top-6 h-3 rounded-full bg-emerald-300/10" style={{ transform: "translateZ(20px)" }} />
        <div className="absolute left-8 top-6 bottom-6 w-2 rounded-full bg-emerald-300/10" style={{ transform: "translateZ(20px)" }} />
        <div className="absolute right-8 top-6 bottom-6 w-2 rounded-full bg-emerald-300/10" style={{ transform: "translateZ(20px)" }} />

        {/* Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-emerald-300/50"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.3px)",
              transform: `translateZ(${Math.random() * 160 - 40}px)`,
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 4, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1.5,
            }}
          />
        ))}

        {/* QR Tiles */}
        {[...Array(5)].map((_, i) => {
          const z = 50 + i * 28;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-40 h-40 rounded-xl border border-emerald-300/40 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              style={{ transform: `translateZ(${z}px)` }}
              initial={{ y: 300, opacity: 0, rotateY: 0 }}
              animate={{ y: -140, opacity: 1, rotateY: 360 }}
              transition={{
                duration: 6.8,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              }}
            >
              <QrCode className="h-16 w-16 text-emerald-300/80" />
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.1) 45%, transparent 70%)",
                  mixBlendMode: "screen",
                }}
              />
            </motion.div>
          );
        })}

        {/* Scan Beam */}
        <motion.div
          className="absolute inset-x-16 h-20 rounded-full blur-3xl"
          style={{
            transform: "translateZ(120px)",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.55) 0%, rgba(16,185,129,0.15) 60%, transparent 80%)",
          }}
          animate={{ top: [60, 380, 60] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cursor light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: "translateZ(160px)",
            background: `radial-gradient(400px 240px at ${50 + xy.x * 30}% ${
              50 + xy.y * 30
            }%, rgba(16,185,129,0.2), transparent 60%)`,
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </div>
  );
}
