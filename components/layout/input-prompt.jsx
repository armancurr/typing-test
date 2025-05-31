"use client";
export default function InputPrompt({
  inputRef,
  userInput,
  handleInputChange,
  isActive,
  isCompleted,
}) {
  return (
    <div className="text-center">
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="opacity-0 absolute -z-10"
        autoFocus
        disabled={isCompleted}
      />
      <div
        className="text-neutral-400 cursor-text font-mono"
        onClick={() => inputRef.current?.focus()}
      >
        {!isActive && "Click here or start typing to begin"}
        {isActive && !isCompleted && "Keep typing..."}
        {isCompleted && "Test completed!"}
      </div>
    </div>
  );
}
