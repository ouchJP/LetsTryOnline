import React, { useState, useEffect } from 'react';
import Card from './ConcentrationCard';
import cardGenres from './cardGenres.json';

const ConcentrationGame = ({ genre }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    const newCards = [...cards];
    const cardIndex = newCards.findIndex((card) => card.id === id);
    const card = newCards[cardIndex];

    if (flippedCards.length < 2 && card.isFlipped) {
      card.isFlipped = false;
      setFlippedCards([...flippedCards, id]);
      newCards[cardIndex] = card;
      setCards(newCards);
    }

    if (flippedCards.length === 1 && flippedCards[0] !== id) {
      const matchedCardIndex = newCards.findIndex(
        (card) => card.id === flippedCards[0] && card.name === cards[cardIndex].name
      );

      if (matchedCardIndex !== -1) {
        newCards[cardIndex].isMatched = true;
        newCards[matchedCardIndex].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[cardIndex].isFlipped = true;
          newCards[newCards.findIndex((card) => card.id === flippedCards[0])].isFlipped = true;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const generateCards = () => {
    const selectedCards = cardGenres[genre];
    const shuffledCards = selectedCards.sort(() => Math.random() - 0.5);
    const chosenCards = shuffledCards.slice(0, 6);

    const cardPairs = chosenCards.concat(chosenCards).sort(() => Math.random() - 0.5);

    setCards(
      cardPairs.map((card, index) => ({
        id: index,
        name: card.name,
        imgUrl: card.imgUrl,
        isFlipped: true,
        isMatched: false,
      }))
    );
    setFlippedCards([]);
  };

  useEffect(() => {
    generateCards();
  }, [genre]);

  return (
    <div>
      <h1>Concentration Game</h1>
      <label htmlFor="genre-select">Genre: {genre} |  Pairs: 5</label>


      <button onClick={generateCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default ConcentrationGame;
