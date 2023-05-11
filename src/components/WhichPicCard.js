import React from 'react';
import './Card.css';

const WhichPicCard = ({ id, name, imgUrl, isWrong, onClick }) => (
  <div
    className={`card ${isWrong ? 'wrong' : ''}`}
    onClick={() => onClick(id)}
  >
    <div className="card-back"></div>
    <div className="card-front">
    
      {<img className="card-front-image" src={imgUrl} alt={name} />}
    </div>
  </div>
);

export default WhichPicCard;
