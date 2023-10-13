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
import RecipePage from './pages/RecipePage';
import HomePage from './pages/HomePage';

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

// ! Sample Code
// const Router = createBrowserRoutes(
//   createRoutesFromElements(
//     <Route path='/' element={<RootLayout />} >
//       <Route index element={<Home/>} />
//       <Route path='about' element={<About/>} />

//       <Route path='help' element={<HelpLayout/>} >
//       <Route path='faq' element={<About/>} />
//       <Route path='contact' element={<About/>} />
//     </Route>

//       <Route path='careers' element={<CareersLayout />}>
//         <Route 
//           index 
//           element={<Careers />} 
//           loader={careersloader}
//         />
//          <Route
//          path="id
//          element={careerDetails}
//          />
//       </Route>

//     <Route path='*' element={<NotFound/>}/>
//     </Route>  
//   )
// )

{/* <Route path='recipe' element={<RecipeLayout />}
  <Route
    index
    element={<Receipes />}
    loader={recipesloader}
  />
  <Route
  path='id'
  element={careerDetails}
  />
  </Route> */}

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<HomePage />} 
      loader={bulkRecipesLoader}
      >
        <Route path=':id' />
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
    </Route>
  )
);

// const Router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       element={
//         <>
//         <GlobalStyle />
//         <Navbar/>
//         <Outlet />
//         </>
//     }
//     >
//       <Route path='/' element={<LoginPage />} />
//       <Route index path='/home' element={<HomePage />}
//       loader={bulkRecipesLoader}
//       />
//         <Route path='home/:id' element={<RecipePage/>}/>
//       <Route path='/signup' element={<SignupPage/>} />
//     </Route>
//   )
// )

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