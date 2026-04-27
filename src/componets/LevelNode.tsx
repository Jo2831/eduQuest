"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type LevelNodeProps = {
  level: number;
  isUnlocked: boolean;
  path: string;
};

export default function LevelNode({ level, isUnlocked, path }: LevelNodeProps) {
  if (isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: level * 0.1, type: "spring", damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-1"
      >
        <Link
          href={path}
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white shadow-md transition hover:bg-green-600"
          aria-label={`Start Mission ${level}`}
        >
          {level}
        </Link>
        <span className="text-xs font-semibold text-green-400">Mission {level}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: level * 0.1 }}
      className="flex flex-col items-center gap-1"
    >
      <span
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl cursor-not-allowed"
        aria-label={`Mission ${level} locked`}
      >
        🔒
      </span>
      <span className="text-xs font-semibold text-gray-500">Mission {level}</span>
    </motion.div>
  );
}
