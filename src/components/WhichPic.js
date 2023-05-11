import React, { useState, useEffect } from 'react';
import cardGenres from './cardGenres.json';
import WhichPicCard from './WhichPicCard';

function WhichPic({ genre }) {

    const [cards, setCards] = useState([]);
    const [totalCards, setTotalCards] = useState(6);
    const [gameStarted, setGameStarted] = useState(true);
    const [randomCard, setRandomCard] = useState("");
    const [randomIndex, setRandomIndex] = useState(0);

    const selectedCards = cardGenres[genre];

    const generateCards = () => {
        if (selectedCards.length < 6) {
            setTotalCards(selectedCards.length);
        }
        const randomCards = selectedCards.sort(() => Math.random() - 0.5);
        if (randomCards.length >= totalCards) {
            const newCards = randomCards.slice(0, totalCards).map((card, index) => ({
                id: index,
                name: card.name,
                imgUrl: card.imgUrl,
                isWrong: false,
            }));
            setCards(newCards);
            setGameStarted(false);
        }
    };

    useEffect(() => {
        if (cards.length > 0) {
            getRandomCard();
        }
    }, [cards]);

    useEffect(() => {
        generateCards();
    }, [genre]);

    const handleCardClick = (card) => {
        if (card === randomIndex) {
            generateCards();
        } else {
            //const updatedCards = [...cards]; 
            //updatedCards[card].isWrong = true; 
            //setCards(updatedCards);
            // ^^^ find a way to workaround setCards here. Otherwise no functionality for wrong answer.
        }
    };


    const getRandomCard = () => {
        if (cards.length > 0) {
            let rIndex = Math.floor(Math.random() * cards.length);
            
            while (rIndex === randomIndex) {
                rIndex = Math.floor(Math.random() * cards.length);
            }
            
            setRandomCard(cards[rIndex].name);
            setRandomIndex(rIndex);
        }
    };
    return (
        <div>
            <h1>Which Pic?</h1>
            <br />
            {gameStarted && <>
                <button onClick={generateCards}>New Cards</button></ >}

            <br />
            <h1>{randomCard}</h1>
            <div className="card-grid">
                {cards.map((card) => (
                    <WhichPicCard key={card.id} {...card} onClick={handleCardClick} />
                ))}
            </div>
        </div>
    );
};

export default WhichPic;
