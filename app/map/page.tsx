"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LevelNode from "@/src/componets/LevelNode";
import UAEFlag from "@/src/componets/UAEFlag";

export default function LevelMapPage() {
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("unlockedLevel");
    if (saved) setUnlockedLevel(Number(saved));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-gray-900 to-green-900 px-6 py-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md"
      >
        <p className="flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-widest text-green-400">
          <UAEFlag /> UAE Space Academy
        </p>
        <h1 className="mt-1 text-center text-3xl font-extrabold tracking-tight text-white">
          Mission Control
        </h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Select your mission to begin
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <LevelNode
              key={lvl}
              level={lvl}
              isUnlocked={lvl <= unlockedLevel}
              path={`/quiz?level=${lvl}`}
            />
          ))}
        </div>
      </motion.section>
    </main>
  );
}
