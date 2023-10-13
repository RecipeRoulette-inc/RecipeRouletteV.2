// libraries
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes, createRoutesFromElements, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

//loaders
import { bulkRecipesLoader } from './pages/HomePage';
import { getRecipeInformationBulk } from './components/singleRecipePage/SingleRecipePage';
//layouts 
import RootLayout from './layouts/RootLayout';

//pages
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AllergyPage from './pages/AllergySelection';
import RecipePage from './pages/RecipePage';
import HomePage from './pages/HomePage';
import SingleRecipePage from './components/singleRecipePage/SingleRecipePage';

// navbar
import Navbar from './components/Navbar/Navbar';

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

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<HomePage />} 
        loader={bulkRecipesLoader}
      >
        <Route path=':id' element={<SingleRecipePage />}
        loader={getRecipeInformationBulk}
        />
      </Route>
       <Route path='login' element={<LoginPage />} />
       <Route path='signup' element={<SignupPage />} />
     </Route>
  )
);

const App = () => {
  return (<RouterProvider router={ Router } />)
}

const Screen = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin: auto;
padding: 115px 50px;
`;

export default App;