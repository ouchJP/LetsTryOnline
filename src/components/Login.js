import React, { useState } from 'react';
import './Login.css';
//import { Document, Page, pdfjs } from 'react-pdf';


//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


function Login() {


    return (
        <div>
            <h1>Login</h1>
            You should not be here...

            <div className="App">
                <a href="/pdf/1.pdf" target="_blank">Lets try 1 Writing pdf</a><br></br>
                <a href="/pdf/1.pdf" target="_blank">Lets try 2 Writing pdf</a>
            </div>

            {/** <Document file="/pdf/1.pdf">
                <Page pageNumber={1} />
    </Document> */}
        </div>
    );
}

export default Login;
