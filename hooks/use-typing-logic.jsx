"use client";
import { useState, useEffect, useCallback } from "react";

export default function useTypingLogic(testText, inputRef) {
  const [userInput, setUserInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [isCompleted, setIsCompleted] = useState(false);

  const words = testText.split(" ");

  const calculateStats = useCallback(() => {
    if (elapsedTime > 0) {
      const minutes = elapsedTime / 60;
      const wordsTyped = correctChars / 5;
      const currentWpm = Math.round(wordsTyped / minutes);
      setWpm(currentWpm);
    }

    if (totalChars > 0) {
      const currentAccuracy = Math.round(
        ((totalChars - mistakes) / totalChars) * 100,
      );
      setAccuracy(currentAccuracy);
    }
  }, [elapsedTime, correctChars, totalChars, mistakes]);

  useEffect(() => {
    let intervalRef;
    if (isActive && !isCompleted) {
      intervalRef = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef);
  }, [isActive, isCompleted]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!isActive && value.length === 1) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (value.length > testText.length) {
      return;
    }

    setUserInput(value);

    let charCount = 0;
    let wordIndex = 0;
    let charIndex = 0;

    for (let i = 0; i < words.length; i++) {
      if (charCount + words[i].length >= value.length) {
        wordIndex = i;
        charIndex = value.length - charCount;
        break;
      }
      charCount += words[i].length + 1;
    }

    setCurrentWordIndex(wordIndex);
    setCurrentCharIndex(charIndex);

    if (value.length > totalChars) {
      setTotalChars(value.length);
    }

    let correct = 0;
    let currentMistakes = mistakes;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === testText[i]) {
        correct++;
      } else {
        if (i >= userInput.length || userInput[i] !== testText[i]) {
          currentMistakes = Math.max(currentMistakes, i + 1 - correct);
        }
      }
    }

    setCorrectChars(correct);
    setMistakes(currentMistakes);

    if (value.length === testText.length) {
      setIsCompleted(true);
      setIsActive(false);
    }
  };

  const resetTest = () => {
    setUserInput("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setIsActive(false);
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setMistakes(0);
    setIsCompleted(false);
    inputRef.current?.focus();
  };

  return {
    userInput,
    currentWordIndex,
    currentCharIndex,
    isActive,
    wpm,
    accuracy,
    isCompleted,
    handleInputChange,
    resetTest,
  };
}
