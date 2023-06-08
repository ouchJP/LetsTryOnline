import React from 'react';
import './Card.css';

const TypingCard = ({ name, imgUrl }) => (
  <div
    className="typingcard"
  >
    <div className="typingcard-front">
      {<img className="typingcard-front-image" src={imgUrl} alt={name} />}
      <div className="typingcard-front-text">{name}</div>
    </div>
  </div>
);

export default TypingCard;
