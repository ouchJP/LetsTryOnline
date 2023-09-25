import React, { useState, useEffect } from 'react';
import cardGenres from './cardGenres.json';
import './Bingo.css';

function Bingo({ genre }) {
    const [cards, setCards] = useState(new Array(9).fill(null)); // Initialize with 9 empty cards
    const [selectedCards, setSelectedCards] = useState([]); // Track selected cards in the sidebar

    const availableCards = cardGenres[genre];

    const [winningCombinations, setWinningCombinations] = useState([
        [0, 1, 2], // First row
        [3, 4, 5], // Second row
        [6, 7, 8], // Third row
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6], // Diagonal top-right to bottom-left
        [0, 3, 6], // Vertical left
        [1, 4, 7], // Vertical mid
        [2, 5, 8] // Vertical right
    ]);

    // Function to update the grid when a card is selected
    const updateGrid = () => {
        const newGrid = new Array(9).fill(null);

        // Fill the newGrid with selected cards
        selectedCards.forEach((card, index) => {
            if (index < 9) {
                newGrid[index] = {
                    id: card.id,
                    name: card.name,
                    imgUrl: card.imgUrl,
                    isFlipped: false,
                    isBingo: false, // Add a state to track bingo
                };
            }
        });

        setCards(newGrid);
    };

    // Handle changes in the selectedCards array
    useEffect(() => {
        updateGrid();
    }, [selectedCards]);

    const toggleCardSelection = (card) => {
        const isSelected = selectedCards.some((c) => c.id === card.id);

        if (isSelected) {
            // Deselect the card
            const updatedSelectedCards = selectedCards.filter((c) => c.id !== card.id);
            setSelectedCards(updatedSelectedCards);
        } else if (selectedCards.length < 9) {
            // Select the card if there's room in the grid
            setSelectedCards([...selectedCards, card]);
        }
    };

    const toggleCardFlip = (index) => {
        const updatedCards = [...cards];
        updatedCards[index].isFlipped = !updatedCards[index].isFlipped;
        setCards(updatedCards);
        checkBingo(); // Check for bingo after flipping a card
    };

    const checkBingo = () => {
        for (const combination of winningCombinations) {
            if (combination.every((index) => cards[index]?.isFlipped)) {
                highlightBingo(combination);
                break;
            }
        }
    };

    const highlightBingo = (combination) => {
        const updatedCards = [...cards];
        combination.forEach((index) => {
            updatedCards[index].isBingo = true;
        });
        setCards(updatedCards);
    };

    const resetCards = () => {
        setSelectedCards([]);
        setCards(new Array(9).fill(null));
    };

    const shuffleCards = () => {
        setSelectedCards([]);
        const randomSelectedCards = shuffleArray(availableCards).slice(0, 9);
        setSelectedCards(randomSelectedCards);
    };

    // Shuffle an array randomly
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <div className="bingo-game">
            <div className="sidebar">
                <h2>Possible Cards</h2>
                <ul>
                    {availableCards.map((card) => (
                        <li
                            key={card.id}
                            className={selectedCards.some((c) => c.id === card.id) ? 'selected' : ''}
                            onClick={() => toggleCardSelection(card)}
                        >
                            {card.name}
                        </li>
                    ))}
                </ul>
                <button onClick={resetCards}>Reset</button>
                <button onClick={shuffleCards}>Shuffle</button>
            </div>
            <div className="bingo-cards">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`bingo-card ${card && card.isFlipped ? 'flipped' : ''} ${
                            card && card.isBingo ? 'bingo' : ''
                        }`}
                        onClick={() => card && toggleCardFlip(index)}
                    >
                        {card && <img src={card.imgUrl} alt={card.name} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bingo;
