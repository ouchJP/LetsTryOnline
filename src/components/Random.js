import React, { useState } from 'react';

const Random = () => {
    const [num, setNum] = useState(1);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(30);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleClick = () => {
        setNum(generateRandomNumber(min, max));
    }

    return (
        <div>
            <h1>Random Number Generator</h1>
            <h2 style={{ fontSize: 96 }}>{num}</h2> <br></br>


            Min Number: <input className='RandomInput' type="number" value={min} onChange={(e) => setMin(e.target.value)} /><br></br>
            Max Number: <input className='RandomInput' type="number" value={max} onChange={(e) => setMax(e.target.value)} /><br></br><br></br>

            <button className='btn' onClick={handleClick}>Generate</button>
        </div>
    );
};

export default Random;
