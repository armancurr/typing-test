"use client";
export default function TextDisplay({
  words,
  userInput,
  testText,
  currentWordIndex,
  currentCharIndex,
}) {
  const getWordStyle = (wordIndex) => {
    if (wordIndex < currentWordIndex) {
      return "text-neutral-500";
    } else if (wordIndex === currentWordIndex) {
      return "text-white";
    }
    return "text-neutral-700";
  };

  const getCharStyle = (wordIndex, charIndex) => {
    const textIndex =
      words.slice(0, wordIndex).join(" ").length +
      (wordIndex > 0 ? 1 : 0) +
      charIndex;

    if (textIndex < userInput.length) {
      return userInput[textIndex] === testText[textIndex]
        ? "text-lime-300"
        : "text-rose-400";
    } else if (
      textIndex === userInput.length &&
      wordIndex === currentWordIndex
    ) {
      return "border-b-2 border-yellow-400 animate-pulse";
    }
    return "";
  };

  return (
    <div className="text-center mb-12">
      <div className="text-3xl leading-relaxed font-mono max-w-5xl mx-auto text-center overflow-wrap-anywhere break-words flex flex-wrap">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="flex items-center">
            <span className={`${getWordStyle(wordIndex)} inline-block`}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={`${getCharStyle(wordIndex, charIndex)} transition-all duration-150 ease-out`}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 && (
              <span className="text-neutral-600 mx-1">•</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
