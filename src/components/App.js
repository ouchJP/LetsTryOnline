import React, { useState, useEffect } from 'react';
import './App.css';
import ConcentrationGame from './ConcentrationGame';
import MissingGame from './MissingGame';
import Flashcards from './Flashcards';
import WhichPic from './WhichPic';
import Typing from './Typing';
import cardGenres from './cardGenres.json';
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faScroll, faBolt, faEye, faBrain, faBomb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBrain, faScroll, faBomb, faBolt, faEye);

function App() {
  const [selectedGenre, setSelectedGenre] = useState(() => {
    const cachedGenre = localStorage.getItem('selectedGenre');
    return cachedGenre ? cachedGenre : 'fruits';
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    localStorage.setItem('selectedGenre', selectedGenre);
  }, [selectedGenre]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="wrapper">
      <BrowserRouter basename="/">
        <>
          <div className='links'>
            <ul>
              <li><Link to="/flashcards">Flashcards <FontAwesomeIcon icon="bolt" /></Link></li>
              <li><Link to="/concentration">Concentration <FontAwesomeIcon icon="bomb" /></Link></li>
              <li><Link to="/missing">Missing <FontAwesomeIcon icon="eye" /></Link></li>
              <li><Link to="/whichpic">Which Pic? <FontAwesomeIcon icon="eye" /></Link></li>
              <li><Link to="/typing">Typing <FontAwesomeIcon icon="eye" /></Link></li>
              <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
                {Object.keys(cardGenres).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </ul>
          </div>
          <Routes>
            <Route path="/flashcards" element={<Flashcards genre={selectedGenre} currentIndex={currentIndex} />} />
            <Route path="/concentration" element={<ConcentrationGame genre={selectedGenre} />} />
            <Route path="/missing" element={<MissingGame genre={selectedGenre} />} />
            <Route path="/whichpic" element={<WhichPic genre={selectedGenre} />} />
            <Route path="/typing" element={<Typing genre={selectedGenre} />} />
            <Route path="*" element={<Flashcards genre={selectedGenre} currentIndex={currentIndex} />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
