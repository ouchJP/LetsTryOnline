import { useState, useEffect } from 'react';
import CardGenres from './cardGenres.json';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
library.add(faPlay);



function Flashcards({ genre }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenreChanging, setIsGenreChanging] = useState(false); // new state variable
  const [previousIndex, setPreviousIndex] = useState(null);


  useEffect(() => {
    setIsGenreChanging(true); // indicate that genre change is in progress
    setCurrentIndex(0); // reset index when genre changes
  }, [genre]);

  useEffect(() => {
    if (isGenreChanging) {
      setIsGenreChanging(false); // indicate that genre change is complete
    }
  }, [isGenreChanging]);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % CardGenres[genre].length);
  };

  const handleRandomClick = () => {
    let randomIndex;
    do {
      randomIndex =  Math.floor(Math.random() * CardGenres[genre].length);
    } while (randomIndex === previousIndex);

    setCurrentIndex(randomIndex);
    setPreviousIndex(randomIndex);
  };

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? CardGenres[genre].length - 1 : currentIndex - 1
    );
  };

  const currentCard = isGenreChanging ? null : CardGenres[genre][currentIndex]; // handle null currentCard during genre change

  return (
    <div>
      <h1>Flashcards</h1>
      <label htmlFor="genre-select">Genre: {genre}</label>
      <div>
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleRandomClick}>Random</button>
        <button onClick={handleNextClick}>Next</button>
        {currentCard && (
          <>
            <h2>{currentCard.name}<audio id="player"></audio><button onclick="document.getElementById('player').play()"><FontAwesomeIcon icon="play" /></button></h2>
            <img className="flashcard" src={currentCard.imgUrl} alt={currentCard.name} />
          </>
        )}
      </div>
    </div>
  );
}

export default Flashcards;
