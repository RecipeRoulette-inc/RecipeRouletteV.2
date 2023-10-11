import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RecipeCard from './components/recipeCard/index'
import FlipCard from './components/flipCard/FlipCard';
import AllergyPage from './pages/AllergySelection';
import SignupPage from './pages/SignupPage';


const GlobalStyle = createGlobalStyle`
* {
    margin: 0; 
    padding:0; 
    box-sizing: border-box;
}

:root {
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
}

body {
  height: 100vh;  
}  
`;


const App = () => {
  return (
    <Screen>
      <GlobalStyle />

      {/* <LoginPage/> */}
      <HomePage />

    </Screen>
  )
};

const Screen = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin: auto;
padding: 50px;
`;

export default App;