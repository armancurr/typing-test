"use client";
export default function Stats({ isActive, isCompleted, wpm, accuracy }) {
  if (!isActive && !isCompleted) return null;

  return (
    <div className="flex justify-center space-x-8 mt-8 text-sm text-neutral-400 font-mono">
      <div>
        Words Per Minute: <span className="font-mono text-lime-300">{wpm}</span>
      </div>
      <div>
        Accuracy: <span className="font-mono text-green-400">{accuracy}%</span>
      </div>
    </div>
  );
}
