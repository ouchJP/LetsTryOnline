import React from 'react';
import './Card.css';

const Card = ({ id, name, imgUrl, isFlipped, onClick }) => (
  <div
    className={`card ${isFlipped ? 'flipped' : ''} `}
    onClick={() => onClick(id)}
  >
    <div className="card-back"></div>
    <div className="card-front">
      {<img className="card-front-image" src={imgUrl} alt={name} />}
      <div class="card-front-text">{name}</div>
    </div>
  </div>
);

export default Card;
