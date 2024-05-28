import './App.css';
import './games.css';

import React, { useState } from 'react';
import MissingGame from './MissingGame';
import WhichPic from './WhichPic';
import Typing from './Typing';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Games({genre}) {

    const gamesList = ['MissingGame', 'WhichPic', 'Typing'];
    const [selectedGame, setSelectedGame] = useState(null);

    const renderGameComponent = () => {
        switch (selectedGame) {
          case 'MissingGame':
            return <MissingGame genre={genre}/>;
          case 'WhichPic':
            return <WhichPic genre={genre}/>;
          case 'Typing':
            return <Typing genre={genre}/>;
          default:
            return null;
        }
      };

  return (
    <div className="container">
      <div className='links'>
        <ul>
          {gamesList.map((game) => (
            <li
              className={`li-copy ${selectedGame === game ? 'selected' : ''}`}
              key={game}
              onClick={() => setSelectedGame(game)}
            >
              {game}
            </li>
          ))}
        </ul>
      </div>
      <div className="game-component">
        {renderGameComponent()}
      </div>
    </div>
  );
};

export default Games;
