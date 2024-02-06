import React, { useState, useEffect } from 'react';
import CardGenres from './cardGenres.json';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
library.add(faPlay);

function Flashcards({ genre }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenreChanging, setIsGenreChanging] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [textSize, setTextSize] = useState(24); // Initial text size

  useEffect(() => {
    setIsGenreChanging(true);
    setCurrentIndex(0);
  }, [genre]);

  useEffect(() => {
    if (isGenreChanging) {
      setIsGenreChanging(false);
    }
  }, [isGenreChanging]);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % CardGenres[genre].length);
  };

  const handleRandomClick = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * CardGenres[genre].length);
    } while (randomIndex === previousIndex);

    setCurrentIndex(randomIndex);
    setPreviousIndex(randomIndex);
  };

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? CardGenres[genre].length - 1 : currentIndex - 1
    );
  };

  const handleIncreaseTextSize = () => {
    setTextSize((size) => size + 2);
  };

  const handleDecreaseTextSize = () => {
    setTextSize((size) => Math.max(8, size - 2)); // Ensure minimum size is 8
  };

  const currentCard = isGenreChanging ? null : CardGenres[genre][currentIndex];

  return (
    <div>
      <h1>Flashcards</h1>
      <label htmlFor="genre-select">Genre: {genre}</label>
      <div>
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleRandomClick}>Random</button>
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handleDecreaseTextSize}>-</button>
        <button onClick={handleIncreaseTextSize}>+</button>
        {currentCard && (
          <>
            <h2 style={{ fontSize: `${textSize}px` }}>

              {currentCard.name}
              <audio id="player"></audio>
              <button onClick={() => document.getElementById('player').play()}>
                <FontAwesomeIcon icon="play" />
              </button>
            </h2>
            <img className="flashcard" src={currentCard.imgUrl} alt={currentCard.name} />
          </>
        )}
      </div>
    </div>
  );
}

export default Flashcards;
