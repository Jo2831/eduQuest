"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import UAEFlag from "@/src/componets/UAEFlag";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-gray-900 to-green-900 px-6">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md sm:p-14"
      >
        <p className="mb-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-green-400">
          <UAEFlag /> Mission Control
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          UAE Space Explorer
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-300 sm:text-lg">
          Launch your learning journey — discover planets, missions, and the
          future of UAE in space.
        </p>

        <motion.div
          className="mt-8 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/map"
            className="inline-flex items-center justify-center rounded-full bg-green-700 px-10 py-3 text-base font-bold text-white shadow-lg transition hover:bg-green-600"
          >
            🚀 Launch Mission
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
