import React, { useState } from 'react';
import './App.css';


function Test() {
    const [input, setInput] = useState("");
    const [text, setText] = useState("No input detected");


    const handleInputText = (event) => {
        setInput(event.target.value);
    }

    const handleClick = () => {
        setText(input);
    }


    return (
        <div>
            <h2>{text}</h2>
            <h2>{input}</h2>
            <input onChange={handleInputText} value={input}></input>
            <button onClick={handleClick}>Push</button>
        </div>
    );
};

export default Test;