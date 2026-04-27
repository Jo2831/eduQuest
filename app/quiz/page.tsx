"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import QuizCard from "@/src/componets/QuizCard";
import UAEFlag from "@/src/componets/UAEFlag";

type Question = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

const questions: Record<string, Question> = {
  1: {
    question: "What planet is closest to the Sun?",
    options: ["Earth", "Mars", "Mercury", "Venus"],
    correctAnswerIndex: 2,
  },
  2: {
    question: "What gas do plants absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correctAnswerIndex: 1,
  },
  3: {
    question: "How many planets are in our solar system?",
    options: ["6", "7", "8", "9"],
    correctAnswerIndex: 2,
  },
  4: {
    question: "What is the name of the UAE's first Mars mission?",
    options: ["Hope Probe", "Mars One", "Red Falcon", "Star Quest"],
    correctAnswerIndex: 0,
  },
  5: {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswerIndex: 2,
  },
  6: {
    question: "In which year did the UAE Hope Probe arrive at Mars?",
    options: ["2019", "2020", "2021", "2022"],
    correctAnswerIndex: 2,
  },
};

function QuizContent() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") ?? "1";
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const selectedQuestion = questions[level] ?? null;
  const nextLevel = String(Number(level) + 1);
  const hasNextLevel = Boolean(questions[nextLevel]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScore(Number(window.localStorage.getItem("totalScore") ?? "0"));
    }
  }, []);

  useEffect(() => {
    setSelectedIndex(null);
    setShowResult(false);
    setResult(null);
    setHasSubmitted(false);
  }, [level]);

  const handleAnswerSelect = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  };

  const handleSubmit = () => {
    if (!selectedQuestion || selectedIndex === null || hasSubmitted) {
      return;
    }

    setHasSubmitted(true);
    const isCorrect = selectedIndex === selectedQuestion.correctAnswerIndex;
    setResult(isCorrect ? "correct" : "wrong");
    setShowResult(true);

    if (isCorrect) {
      setScore((prev) => {
        const newScore = prev + 10;
        localStorage.setItem("totalScore", String(newScore));
        return newScore;
      });
      const currentUnlocked = Number(localStorage.getItem("unlockedLevel") ?? "1");
      const nextUnlocked = Number(level) + 1;
      if (nextUnlocked > currentUnlocked) {
        localStorage.setItem("unlockedLevel", String(nextUnlocked));
      }
    }
  };

  if (!selectedQuestion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-gray-900 to-green-900 px-6 py-12">
        <div className="w-full max-w-xl space-y-6 text-center">
          <p className="text-sm text-white/60">No mission available for level {level}.</p>
          <Link
            href="/map"
            className="inline-block rounded-full bg-green-700 px-6 py-2 font-bold text-white transition hover:bg-green-600"
          >
            🗺️ Back to Mission Map
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-gray-900 to-green-900 px-6 py-12">
      <div className="w-full max-w-xl space-y-6">
        {/* Header bar */}
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-green-400">
            <UAEFlag /> Mission {level}
          </p>
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-bold text-white">
            Score: {score}
          </span>
        </div>

        <h1 className="text-center text-3xl font-extrabold text-white">
          Mission {level}
        </h1>

        <QuizCard
          key={level}
          question={selectedQuestion.question}
          options={[...selectedQuestion.options]}
          correctAnswerIndex={selectedQuestion.correctAnswerIndex}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-center">
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={selectedIndex === null || showResult || hasSubmitted}
            className="rounded-full bg-green-700 px-8 py-3 text-base font-bold text-white shadow-lg transition hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
            whileHover={selectedIndex !== null && !hasSubmitted ? { scale: 1.05 } : undefined}
            whileTap={selectedIndex !== null && !hasSubmitted ? { scale: 0.95 } : undefined}
          >
            Submit Answer
          </motion.button>
        </div>
      </div>

      {/* Result popup */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <div className="text-5xl">{result === "correct" ? "🎉" : "💫"}</div>
              <h2 className="mt-3 text-2xl font-extrabold text-gray-900">
                {result === "correct" ? "Mission Complete!" : "Mission Failed"}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {result === "correct"
                  ? "Outstanding work, Space Explorer! Next mission awaits."
                  : "Don't give up — every astronaut learns from mistakes."}
              </p>
              {result === "correct" && (
                <p className="mt-2 text-lg font-bold text-green-700">+10 Points 🌟</p>
              )}

              <div className="mt-6 flex flex-col gap-3">
                {result === "correct" && hasNextLevel && (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={`/quiz?level=${nextLevel}`}
                      className="block w-full rounded-full bg-green-700 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                    >
                      🚀 Next Mission
                    </Link>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/map"
                    className="block w-full rounded-full border-2 border-gray-200 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    🗺️ Back to Mission Map
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-gray-900 to-green-900 px-6">
          <p className="text-white/60">Loading mission...</p>
        </main>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
