// libraries
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes, createRoutesFromElements, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

//loaders
import { bulkRecipesLoader } from './pages/HomePage';

//layouts 
import RootLayout from './layouts/RootLayout';

//pages
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AllergyPage from './pages/AllergySelection';
// import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/bw images/fast-food-doodles-hand-drawn-colorful-vector-symbols-objects_217204-778.jpg";
// import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/Screenshot 2023-10-12 at 12.35.22 PM.png";import RecipePage from './pages/RecipePage';
import HomePage from './pages/HomePage';

// navbar
import Navbar from './components/Navbar/Navbar';
import SingleRecipePage from './components/singleRecipePage/SingleRecipePage';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} 
      // loader={bulkRecipesLoader}
      />
      <Route path=':id'
        element={<SingleRecipePage />}
        // loader={getRecipeInformationBulk}
      />

        {/* <Route path='search/q:'
        element={<SearchResults/>}
        loader={getSearchResults}
        /> */}
        
    {   <Route path='login' element={<LoginPage />} /> }
   <Route path='signup' element={<SignupPage />} /> 
      </Route>
  )
);

const App = () => {
  return (<RouterProvider router={ Router } />)
}

export default App;