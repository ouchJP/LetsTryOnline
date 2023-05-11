import React, { useState, useEffect } from 'react';
import Card from './ConcentrationCard';
import cardGenres from './cardGenres.json';

const MissingGame = ({ genre }) => {
  const [hiddenCards, setHiddenCards] = useState(1);
  const [cards, setCards] = useState([]);
  const [totalCards, setTotalCards] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);

  const selectedCards = cardGenres[genre];

  const handleHiddenCardsChange = (event) => {
    setHiddenCards(event.target.value);
  };

  const handleTotalCards = (event) => {
    setTotalCards(event.target.value);
  };


  const generateCards = () => {
    const randomCards = selectedCards.sort(() => Math.random() - 0.5);
    if (randomCards.length >= totalCards) {
      const flippedCardIndices = [];
      setCards(
        randomCards.slice(0, totalCards).map((card, index) => ({
          id: index,
          name: card.name,
          imgUrl: card.imgUrl,
          isFlipped: flippedCardIndices.includes(index),
        }))
      );
      setGameStarted(true);
    }
  };

  useEffect(() => {
    generateCards();
  }, [genre]);

  const hideCards = () => {
    if (cards.length >= totalCards) {
      const flippedCardIndices = [];
      while (flippedCardIndices.length < hiddenCards) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        if (!flippedCardIndices.includes(randomIndex)) {
          flippedCardIndices.push(randomIndex);
        }
      }
      setCards(
        cards.slice(0, totalCards).map((card, index) => ({
          id: index,
          name: card.name,
          imgUrl: card.imgUrl,
          isFlipped: flippedCardIndices.includes(index),
        }))
      );
    }
  }


  const handleCardClick = (id) => {
    setCards((clickedCard) => {
      return clickedCard.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            isFlipped: !card.isFlipped,
          };
        }
        return card;
      });
    });
  };

  return (
    <div>
      <h1>Missing Game</h1>
      <br />
      <label htmlFor="total-cards-select">Number of cards:</label>
      <select id="total-cards-select" value={totalCards} onChange={handleTotalCards}>
        {Array.from({ length: selectedCards.length + 1 }, (_, option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={generateCards}>New Cards</button>
      <br />
      {gameStarted && <><label htmlFor="hidden-cards-select">Number of hidden cards:</label>
        <select id="hidden-cards-select" value={hiddenCards} onChange={handleHiddenCardsChange}>
          {Array.from({ length: selectedCards.length + 1 }, (_, option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={hideCards}>Hide {hiddenCards} Card(s)</button></ >}
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default MissingGame;
