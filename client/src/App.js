// libraries
import React, { useContext, useState } from 'react'
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
import HomePage from './pages/HomePage';
import SingleRecipePage from './components/singleRecipePage/SingleRecipePage';

// navbar
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} 
        />
        <Route path='home' element={<HomePage />}
        loader={bulkRecipesLoader}
        />
        <Route path=':id'
          element={<SingleRecipePage />}
          loader={getRecipeInformationBulk}
          />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
       </Route>
      )
  );

  return (<RouterProvider router={ Router } />)
}

export default App;