"use client";
import React, { useState } from "react";
import * as Tone from "tone";

const StartAudioButton: React.FC = () => {
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    if (!started) {
      try {
        // Tone.start() returns a promise and resumes the AudioContext.
        await Tone.start();
        setStarted(true);
        console.log("Audio Context has been started.");
      } catch (error) {
        console.error("Error starting the audio context:", error);
      }
    }
  };

  return (
    <button
      onClick={handleStart}
      disabled={started}
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {started ? "Audio Started" : "Start Audio"}
    </button>
  );
};

export default StartAudioButton;
