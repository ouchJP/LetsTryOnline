import React, { useState, useEffect, useRef } from 'react';
import './random.css';

const Random = () => {
    const [num, setNum] = useState(1);
    const [min, setMin] = useState(() => {
        const savedMin = localStorage.getItem('min');
        return savedMin !== null ? JSON.parse(savedMin) : 1;
    });
    const [max, setMax] = useState(() => {
        const savedMax = localStorage.getItem('max');
        return savedMax !== null ? JSON.parse(savedMax) : 30;
    });
    
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('min', min);
    }, [min]);

    useEffect(() => {
        localStorage.setItem('max', max);
    }, [max]);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleClick = () => {
        setIsAnimating(true);
        intervalRef.current = setInterval(() => {
            setNum(generateRandomNumber(min, max));
        }, 1);

        setTimeout(() => {
            clearInterval(intervalRef.current);
            setNum(generateRandomNumber(min, max));
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div>
            <h1>Random Number Generator</h1>
            <h2 style={{ fontSize: 96 }}>{num}</h2>

            Min Number: <input className='RandomInput' type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} /><br />
            Max Number: <input className='RandomInput' type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} /><br /><br />

            <button className='btn' onClick={handleClick} disabled={isAnimating}>Generate</button>
        </div>
    );
};

export default Random;
