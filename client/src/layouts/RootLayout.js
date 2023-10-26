import styled, {createGlobalStyle} from 'styled-components';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { queryMade, populateMain, clearMain } from '../../slices/queryRecipesSlice';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/searchBar/SearchBar';
// import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/bw images/fast-food-doodles-hand-drawn-colorful-vector-symbols-objects_217204-778.jpg";
import img from "../public/brooke-lark-wMzx2nBdeng-unsplash.jpg"
import rouletteWheel from "../public/rouletteWheel.svg"

//custom hooks
import useAuth from '../components/hooks/useAuth';

// components 


//add fonts here
const GlobalStyle = createGlobalStyle`
* {
    // margin: auto; 
    // padding: 10px 10px; 
    // box-sizing: border-box;
    font-family: 'Chelsea Market';
}

:root {
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
}
`;

import AuthProvider from '../components/authentication/AuthProvider';

const backgrounddiv = () => {
  
  return (
    <div>
      <img/>
    </div>
  )
}

const RootLayout = () => {
  const navigate = useNavigate()
  const { token, onLogout } = useAuth();
  const location = useLocation();
  
  // console.log('Location', location);

  const dispatch = useDispatch();
  const queryRecipes = useSelector(state => state.queryRecipes.queryRecipes)
  // console.log('RootLayout queryRecipes: ', queryRecipes);
  

  const onSubmit = (data) => {
    // console.log('-------> BEFORE DATA FROM ROOT LAYOUT: ', data);
    
    fetch('http://localhost:3000/recipes/searchRecipes', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          console.log('res not ok')
        }
        console.log('HERE ARE THE RECIPES FROM SEARCHBAR ROOTLAYOUT LINE 64')
        return res.json();
      })
      .then((data) => {
        // console.log('-------> THEN DATA FROM ROOT LAYOUT: ', data);


        // need to take the params from the sea

        dispatch(clearMain());
        dispatch(populateMain(data));
        dispatch(queryMade());
        navigate('hello')
        // console.log('STATE----------------->',queryRecipes)
        // console.log('-------> RootLayout queryRecipes: ', queryRecipes);
      })
      .catch((error) => {
        console.error(error);
    })
  }

  const onSubmitProfile = () => {
    navigate('/profile')
  }

  const onSubmitAddRecipe = () => {
    navigate('/add-recipe')
  }

  return (
    <AuthProvider>
    <Layout src={img}>
      <GlobalStyle/>
        <Nav>
              <LogoLink  to='/'>Recipe Roulette</LogoLink>
          <SearchBar onSubmit={onSubmit}/>
            {token && (
              <button type='button' onClick={onLogout}>Sign Out</button>
              )
          }

          {(!token && (location.pathname === '/login' || location.pathname === '/signup')) ? (
            <div>
              <LoginLink to='/login'>LogIn</LoginLink>
              <SignUpLink to='/signup'>SignUp</SignUpLink>
              </div>
          ): 
          <ButtonBox>
            <button type='button' onClick={onLogout}>Sign Out</button>
            <button type='button' onClick={onSubmitProfile}>Profile</button>
            <button type = 'button' onClick={onSubmitAddRecipe}>Add Recipe</button>
            </ButtonBox>}
            </Nav>
      <Main>
        <Outlet/>
      </Main>
      </Layout>
      </AuthProvider>
  )
}; 

const Layout = styled.div`
background-image: ${({src}) => `url(${src})`};
background-size: cover;
background-position: right center;
background-repeat: no-repeat;
width: 100vw; 
height: 100vh; 
display:flex;
align-items:center;
justify-content: center;
`;

const ButtonBox = styled.div`
display: flex;
flex-direction: column;
`
const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center; /* Center content vertically */

  color: white;
  font-size: 35px;
  text-decoration: none;
`;
const Nav = styled.div`
  top: 0;
  position: fixed;
  display: grid;
  grid-template-columns: auto auto auto; /* Center column takes up more space */
  align-items: center;
  justify-content: space-evenly;

  height: 100px;
  width: 100%;
  z-index: 2000;
`;


const Main = styled.main`
display: flex;
justify-content: center;
align-content: center;

`;

const LoginLink = styled(NavLink)`
display: flex;
justify-content: center;
text-decoration: none;
color: white;
// height: 60px;
// width: 80px;
border-radius: 1rem;
padding: 16px;

`


const SignUpLink = styled(NavLink)`
display: flex;
justify-content: center;
aliign-items: center;
text-decoration: none;
color: white;
// height: 60px;
// width: 80px;
border-radius: 1rem;
padding: 16px;
`


export default RootLayout;