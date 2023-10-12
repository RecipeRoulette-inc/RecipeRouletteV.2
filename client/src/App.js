import React from 'react'
import { Route, Routes, createRoutesFromElements, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage, { careersloader } from './pages/HomePage';
import RecipeCard from './components/recipeCard/index'
import FlipCard from './components/flipCard/FlipCard';
import AllergyPage from './pages/AllergySelection';
import Navbar from './components/Navbar/Navbar';
import RecipePage from './pages/RecipePage';
import { Login } from '@mui/icons-material';


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



export const bulkRecipesLoader = async () => {
  console.log('recipesLoader')
  const res = await fetch('http://localhost:3000/test'); 

  return res.json();
}

// ! Trial Run 
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
        <GlobalStyle />
        <Navbar/>
        <Outlet />
        </>
    }
    >
      <Route index path='/home' element={<HomePage />}
      loader={bulkRecipesLoader}
      >
        <Route path=':id' element={<RecipePage/>}/>
      </Route>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/signup' element={<SignupPage/>} />
    </Route>
  )
)

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