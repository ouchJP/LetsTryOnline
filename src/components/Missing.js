import './App.css';
//import { cardList } from "./CardGenres";
import React, { useEffect, useState } from 'react';

function Missing() {

  //carddata -> dropdown -> carddata.length is amount of options
  //select option -> cardList data refreshed/randomised -> cut excess objects
const cardList = null;
  const [CardList, setCards] = useState(null);

  const getCards = () => {

    //shuffle cards
    let currentIndex = cardList.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
        // And swap it with the current element.
      [cardList[currentIndex], cardList[randomIndex]] = [
        cardList[randomIndex], cardList[currentIndex]];
    }


    setCards(cardList);
  }

  useEffect(() => {
    getCards();
  });

  

  const setNewCardsTotal = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    //refresh cardList
    getCards();
    //randomly cut x number of objects from array for chosen length in dropdown
    //for (let i = 0; i < cardList.length - e.target.value; i++ )
    //cardList[random].splice;
    //setCards(cardList);
  }

  const updateGameCards = () => {
    //
  }

  const hideCards = () => {

  }

  const showCards = () => {

  }

  return (
    <div className="gameBody">
      <div className="settingdiv">
        <h1>Settings</h1>
        <label for="cards">Choose total cards</label>
        <select name="cardstotal" id="cardstotal" onChange={setNewCardsTotal}>
          {CardList && CardList.map((card, index) => {
            return (
              <option
                key={index}
                value={index}
              >
                {index + 1}
              </option>
            )
          })}
        </select><br></br>
        <label for="cards">Choose hidden cards</label>
        <select name="cardshidden" id="cardshidden">
          {CardList && CardList.map((card, index) => {
            return (
              <option
                key={index}
                value={index}
              >
                {index + 1}
              </option>
            )
          })}
        </select><br></br>
        <button onClick={updateGameCards}>New Cards</button>
        <button onClick={showCards}>Hide Cards</button>
        <button onClick={hideCards}>Show Cards</button>
      </div>
      <div className="cardContainer">
        {
          CardList && CardList.map((data, index) => {
            return (
              <div className="card" key={index}>
                <p>{data.text}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};


export default Missing;
