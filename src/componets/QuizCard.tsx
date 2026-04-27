"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type QuizCardProps = {
	question: string;
	options: string[];
	correctAnswerIndex: number;
	showResult: boolean;
	onAnswerSelect: (selectedIndex: number) => void;
};

export default function QuizCard({
	question,
	options,
	correctAnswerIndex,
	showResult,
	onAnswerSelect,
}: QuizCardProps) {
	const [selectedOption, setSelectedOption] = useState<number | null>(null);

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="w-full rounded-2xl bg-white p-6 shadow-lg"
		>
			<h2 className="mb-5 text-lg font-semibold leading-snug text-gray-900">
				{question}
			</h2>

			<div className="grid gap-3">
				{options.map((option, index) => {
					const isSelected = selectedOption === index;
					const isCorrect = index === correctAnswerIndex;
					const showCorrect = showResult && isSelected && isCorrect;
					const showWrong = showResult && isSelected && !isCorrect;

					return (
						<motion.button
							key={option}
							type="button"
							onClick={() => {
								if (showResult) return;
								setSelectedOption(index);
								onAnswerSelect(index);
							}}
							whileHover={!showResult ? { scale: 1.02 } : undefined}
							whileTap={!showResult ? { scale: 0.97 } : undefined}
							animate={
								showCorrect
									? { scale: [1, 1.06, 1] }
									: showWrong
									? { x: [-5, 5, -5, 5, 0] }
									: { scale: 1 }
							}
							transition={{ duration: 0.3 }}
							disabled={showResult}
							className={[
								"w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
								showCorrect
									? "border-green-600 bg-green-600 text-white"
									: showWrong
									? "border-red-500 bg-red-500 text-white"
									: isSelected
									? "border-green-700 bg-green-700 text-white"
									: "border-gray-200 bg-gray-50 text-gray-800 hover:border-green-600 hover:bg-green-50",
								showResult ? "cursor-default" : "cursor-pointer",
							].join(" ")}
						>
							{option}
						</motion.button>
					);
				})}
			</div>
		</motion.div>
	);
}
