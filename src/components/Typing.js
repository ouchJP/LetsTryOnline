import React, { useState, useEffect, useRef } from 'react';
import TypingCard from './TypingCard';
import cardGenres from './cardGenres.json';

//Version 1.0:
//      CSS needs fixing
//      handleInputChange() will not run checkMatch() correctly, currently using useEffect with no setTimeout. FIX!

const Typing = ({ genre }) => {
    const [cards, setCards] = useState([]);
    const [totalCards, setTotalCards] = useState(0);
    const [currentCard, setCurrentCard] = useState(null);
    const [previousIndex, setPreviousIndex] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isMatch, setIsMatch] = useState(false);

    const selectedCards = cardGenres[genre];
    const inputRef = useRef(null);

    const generateCards = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * selectedCards.length);
        } while (randomIndex === previousIndex);

        setCards(
            selectedCards.map((card, index) => ({
                id: index,
                name: card.name,
                imgUrl: card.imgUrl
            }))
        );
        setCurrentCard(selectedCards[randomIndex]);
        setTotalCards(selectedCards.length);
        setPreviousIndex(randomIndex);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
            checkMatch();

    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkMatch();
        }
        if (event.key === 'Space') {
            event.preventDefault();
            checkMatch();
        }
    };

    const checkMatch = () => {
        if (inputValue.toLowerCase() === currentCard.name.toLowerCase()) {
            setIsMatch(true);
        }
    };

    const handleNextCard = () => {
        setInputValue('');
        setIsMatch(false);
        generateCards();
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    };

    useEffect(() => {
        generateCards();
    }, [genre]);

    //useEffect(() => {
    //    checkMatch();
    //}, [inputValue]);

    useEffect(() => {
        if (isMatch) {
            handleNextCard();
        }
    }, [isMatch]);

    const renderHighlightedName = () => {
        const nameLetters = currentCard.name.toLowerCase().split('');
        const inputLetters = inputValue.toLowerCase().split('');

        return nameLetters.map((letter, index) => {
            let style = { color: 'red' };

            if (inputLetters[index] === letter) {
                style = { color: 'green' };
            }

            return (
                <span key={index} style={style}>
                    {currentCard.name[index]}
                </span>
            );
        });
    };


    return (
        <div>
            <h1>Typing</h1>
            <br />
            <div className="typingGrid">
                {currentCard && (
                    <TypingCard
                        className="typingCard"
                        id={currentCard.id}
                        name={renderHighlightedName()}
                        imgUrl={currentCard.imgUrl}
                    />
                )}
                <br />
                <input
                    type="text"
                    className="typingInput typingcard-front-text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    disabled={isMatch}
                    ref={inputRef}
                />
                <br />
            </div>
        </div>
    );
};

export default Typing;
