// libraries
import React from 'react'
import { Route, Routes, createRoutesFromElements, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
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
import RecipePage from './pages/RecipePage';
import HomePage from './pages/HomePage';

// navbar
import Navbar from './components/Navbar/Navbar';
import SingleRecipePage from './components/singleRecipePage/SingleRecipePage';
import { bulkRecipesLoader } from './pages/HomePage';
import { getRecipeInformationBulk } from './components/singleRecipePage/SingleRecipePage';


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
    // <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<HomePage />} 
        loader={bulkRecipesLoader}
      >
        <Route path=':id' element={<SingleRecipePage />}
        loader={getRecipeInformationBulk}
        />
      </Route>
      // <Route path='login' element={<LoginPage />} />
      // <Route path='signup' element={<SignupPage />} />
    // </Route>
  )
);

const App = () => {
  return (<RouterProvider router={ Router } />)
}

// const App = () => {

//   // const location = useLocation();
//   // const showBackground = location.pathname !== '/login';

//   return (
//     <Router>  
//       <GlobalStyle />
//       <Navbar />
//       <Screen >
//         <Routes>
//           <Route path='/home' element={<HomePage/>} >
//             {/* <Route path=':id' element={<SingleRecipePage/>}> </Route> */}
//           </Route>
//           <Route path='/' element={<LoginPage />} />
//           <Route path='/signup' element={<SignupPage />} />
//         </Routes>
//     </Screen>
//     </Router>
//   )
// };

const Screen = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin: auto;
padding: 115px 50px;
`;

export default App;