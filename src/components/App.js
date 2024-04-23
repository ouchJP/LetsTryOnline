import React, { useState, useEffect } from 'react';
import './App.css';
import ConcentrationGame from './ConcentrationGame';
import MissingGame from './MissingGame';
import Flashcards from './Flashcards';
import WhichPic from './WhichPic';
import Typing from './Typing';
import Files from './Files';
import Random from './Random';
import VideoPlayer from './VideoPlayer';
import MyButtonComponent from './MyButtonComponent';
//import Bingo from './Bingo';
import cardGenres from './cardGenres.json';
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faScroll, faBolt, faEye, faBrain, faBomb, faKeyboard, faGem, faKey, faDice, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faBrain, faScroll, faBomb, faBolt, faEye, faKeyboard, faGem, faKey, faDice, faVideo);

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
              {/*<li><Link to="/concentration">Concentration <FontAwesomeIcon icon="bomb" /></Link></li>*/}
              <li><Link to="/missing">Missing <FontAwesomeIcon icon="eye" /></Link></li>
              <li><Link to="/whichpic">Which Pic? <FontAwesomeIcon icon="gem" /></Link></li>
              <li><Link to="/typing">Typing <FontAwesomeIcon icon="keyboard" /></Link></li>
              <li><Link to="/videos">Video <FontAwesomeIcon icon="video" /></Link></li>
              <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
                {Object.keys(cardGenres).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <li><Link to="/random">Random <FontAwesomeIcon icon="dice" /></Link></li>
              <li><Link to="/files"><FontAwesomeIcon icon="key" /></Link></li>
            </ul>
          </div>
          <Routes>
            <Route path="/flashcards" element={<Flashcards genre={selectedGenre} currentIndex={currentIndex} />} />
            <Route path="/concentration" element={<ConcentrationGame genre={selectedGenre} />} />
            <Route path="/missing" element={<MissingGame genre={selectedGenre} />} />
            <Route path="/whichpic" element={<WhichPic genre={selectedGenre} />} />
            <Route path="/typing" element={<Typing genre={selectedGenre} />} />
            <Route path="/random" element={<Random genre={selectedGenre} />} />
            <Route path="/files" element={<Files genre={selectedGenre} />} />
            <Route path="/pdf" element={<MyButtonComponent genre={selectedGenre} />} />
            <Route path="/videos" element={<VideoPlayer genre={selectedGenre} />} />
            <Route path="*" element={<Flashcards genre={selectedGenre} currentIndex={currentIndex} />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
