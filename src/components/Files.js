import React, { useState } from 'react';
import './Login.css';
//import { Document, Page, pdfjs } from 'react-pdf';
import cardGenres from './files.json';


//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function Files() {
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (password === process.env.REACT_APP_PASSWORD) {
            setLoggedIn(true);
        } else {
            alert('Incorrect password!');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {!loggedIn && (
                <div>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}

            {loggedIn && (
                <div>
                    <div className="App">
                        <a className="noPurple" href="/pdf/1.pdf" target="_blank">Lets try 1 Writing pdf</a><br></br>
                        <a className="noPurple" href="/pdf/2.pdf" target="_blank">Lets try 2 Writing pdf</a><br></br>
                        <a className="noPurple" href="/pdf/quiz.pdf" target="_blank">3-8 quiz</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Genre</th>
                                <th>Small Cards</th>
                                <th>Worksheets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(cardGenres).map((genre, index) => {
                                const genreItems = cardGenres[genre];
                                const hasSmallCards = genreItems.some(item => item['small cards']);
                                const hasWorksheets = genreItems.some(item => item.worksheet);

                                if (!hasSmallCards && !hasWorksheets) return null;

                                return (
                                    <tr key={index}>
                                        <td>{genre}</td>
                                        <td>
                                            {hasSmallCards && genreItems.map((item, idx) => (
                                                <div key={idx}>
                                                    {item['small cards'] && (
                                                        <a className="noPurple" href={item['small cards']} target="_blank" rel="noopener noreferrer">
                                                            {item['small cards']}
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {hasWorksheets && genreItems.map((item, idx) => (
                                                <div key={idx}>
                                                    {item.worksheet && (
                                                        <a className="noPurple" href={item.worksheet} target="_blank" rel="noopener noreferrer">
                                                            {item.worksheet}
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/** <Document file="/pdf/1.pdf">
                        <Page pageNumber={1} />
                    </Document> */}
                </div>
            )}
        </div>
    );
}

export default Files;
