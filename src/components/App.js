import React, { useState, useEffect } from 'react';
import './App.css';
import ConcentrationGame from './ConcentrationGame';
import MissingGame from './MissingGame';
import Flashcards from './Flashcards';
import WhichPic from './WhichPic';
import cardGenres from './cardGenres.json';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from "react-router-dom";
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
      <Router>
        <>
          <div className='links'>
            <ul>
              <li><Link to="/flashcards">Flashcards <FontAwesomeIcon icon="bolt" /></Link></li>
              <li><Link to="/concentration">Concentration <FontAwesomeIcon icon="bomb" /></Link></li>
              <li><Link to="/missing">Missing <FontAwesomeIcon icon="eye" /></Link></li>
              <li><Link to="/whichpic">Which Pic? <FontAwesomeIcon icon="eye" /></Link></li>
              {/*<li><Link to="test">Test</Link></li>*/}
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
            <Route path="/flashcards" exact element={<Flashcards genre={selectedGenre} currentIndex={currentIndex} />} />
            <Route path="/concentration" exact element={<ConcentrationGame genre={selectedGenre} />} />
            <Route path="/missing" exact element={<MissingGame genre={selectedGenre} />} />
            <Route path="/whichpic" exact element={<WhichPic genre={selectedGenre} />} />
            <Route path="*" element={<Navigate to="/flashcards" />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
