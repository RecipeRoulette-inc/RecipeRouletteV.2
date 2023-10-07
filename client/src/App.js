import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';

const GlobalStyle = createGlobalStyle`
body {
    margin: 0; 
    padding: 0; 
}  

* {
    box-sizing: border-box;
}

`;


const App = () => {
    return (
        <>
        <GlobalStyle/>
        <LoginPage />
        </>
    )
}

export default App;