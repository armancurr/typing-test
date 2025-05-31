"use client";
import { useState, useRef } from "react";
import useTypingLogic from "@/hooks/use-typing-logic";
import TextDisplay from "@/components/layout/text-display";
import Stats from "@/components/layout/stats";
import InputPrompt from "@/components/layout/input-prompt";

const DEFAULT_TEXT =
  "the sun shines bright on warm summer days birds sing sweetly in the tall green trees a gentle breeze blows through the open window life feels calm and peaceful now just type these words without any worry and feel the rhythm of words quickly keep";

export default function TypingTest() {
  const [testText] = useState(DEFAULT_TEXT);
  const inputRef = useRef(null);

  const {
    userInput,
    currentWordIndex,
    currentCharIndex,
    isActive,
    wpm,
    accuracy,
    isCompleted,
    handleInputChange,
    resetTest,
  } = useTypingLogic(testText, inputRef);

  const words = testText.split(" ");

  return (
    <div className="relative">
      <div className="flex items-center justify-center min-h-[80vh] px-8">
        <div className="w-full max-w-5xl">
          <TextDisplay
            words={words}
            userInput={userInput}
            testText={testText}
            currentWordIndex={currentWordIndex}
            currentCharIndex={currentCharIndex}
          />

          <InputPrompt
            inputRef={inputRef}
            userInput={userInput}
            handleInputChange={handleInputChange}
            isActive={isActive}
            isCompleted={isCompleted}
          />

          <Stats
            isActive={isActive}
            isCompleted={isCompleted}
            wpm={wpm}
            accuracy={accuracy}
          />
        </div>
      </div>
    </div>
  );
}
