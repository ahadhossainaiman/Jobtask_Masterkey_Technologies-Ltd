import React, { useState } from "react";

const AlphabetTiles = () => {
  const [outputString, setOutputString] = useState("");

  const handleTileClick = (letter) => {
    setOutputString((prev) => {
      const newString = prev + letter;
      return replaceConsecutiveLetters(newString);
    });
  };
  const handleReset = () => {
    setOutputString("");
  };

  const replaceConsecutiveLetters = (str) => {
    return str.replace(/(.)\1{2,}/g, (match) => "_".repeat(match.length));
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="p-4">
      <div className="grid grid-cols-9 gap-4 border-2 border-green-500 p-5 rounded-md">
        {alphabet.map((letter) => (
          <div
            key={letter}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white text-xl cursor-pointer rounded transition duration-300 hover:bg-blue-700"
            onClick={() => handleTileClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div
        id="outputString"
        className="mt-4 text-2xl border-2 my-5  border-red-500 p-5 rounded-md"
      >
        {outputString}
      </div>
      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
};

export default AlphabetTiles;
