// libraries
import React, { createContext, useContext, useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes, createRoutesFromElements, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
import AuthProvider from './components/authentication/AuthProvider';
import ProtectedRoute from './components/protectedRoute/protectedRoute';

// components
import NoMatch from './components/routing/NoMatch';

const App = () => {
  // add the logic below to a authProvider component 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser()
  }, []);

  const verifyUser = () => {
    fetch('/verifyUser')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data === false) navigate('/');
      })
    setLoading(false);
  };

  if (loading) {
    return (<div>Loading ...</div>)
  } else {
    const Router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={
          <AuthProvider>
            <RootLayout />
          </AuthProvider>
        }
        />
          <Route index element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />
          <Route path='home' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
            loader={bulkRecipesLoader}
          />
          <Route path=':id'
            element={<SingleRecipePage />}
            loader={getRecipeInformationBulk}
          />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      )
    )
  };

  const APP = <AuthProvider></AuthProvider>

  return <RouterProvider router={Router} />
}

export default App;