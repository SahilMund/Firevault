import React, { useState, useEffect } from "react";
import { generate, count } from "random-words";

import Header from "./Header";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import Popup from "./Popup";
import Notification from "./Notification";
import { showNotification as show } from "../../helpers/game";

// const words = ['application', 'programming', 'interface', 'wizard'];
// let selectedWord = words[Math.floor(Math.random() * words.length)];

function Game() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  let [selectedWord, setSelectedWord] = useState("");

  const generateRandomWords = () => {
    const wd = generate({ minLength: 5, maxLength: 10 });
    setSelectedWord(wd);
  };
  // console.log(selectedWord);

  useEffect(() => {
    generateRandomWords();
  },[])

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    // const random = Math.floor(Math.random() * words.length);
     generateRandomWords();
  }

  return (
    <div className="game-root-container">
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />

      <Notification showNotification={showNotification} />
    </div>
  );
}

export default Game;
