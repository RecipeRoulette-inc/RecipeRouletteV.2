import styled, { createGlobalStyle } from 'styled-components';
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

//add fonts here
const GlobalStyle = createGlobalStyle`
* {
    font-family: 'Chelsea Market';
}

:root {
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
}
`;

import AuthProvider from '../components/authentication/AuthProvider';


const RootLayout = () => {
  const navigate = useNavigate()
  const { token, onLogout } = useAuth();
  const loggedin = useSelector((state) => state.authInput)
  console.log(loggedin)

  // console.log('Location', location);

  const dispatch = useDispatch();

  // console.log('RootLayout queryRecipes: ', queryRecipes);


  const onSubmit = (data) => {
    // console.log('-------> BEFORE DATA FROM ROOT LAYOUT: ', data);

    fetch('http://localhost:3000/recipes/searchRecipes', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
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

    <Layout src={img}>
      <GlobalStyle />

      {loggedin.token ? (
        <Nav>
          <LogoLink to='/'>Recipe Roulette</LogoLink>
          <SearchBar onSubmit={onSubmit} />
          <ButtonBox>
            <button type='button' onClick={onLogout}>Sign Out</button>
            <button type='button' onClick={onSubmitProfile}>Profile</button>
            <button type='button' onClick={onSubmitAddRecipe}>Add Recipe</button>
          </ButtonBox>
        </Nav>
      ) : (
        <div>
          <LogoLinkBeforeLogin to='/'>Recipe Roulette</LogoLinkBeforeLogin>
        </div>
      )}

      <Outlet />
    </Layout>

  )
};

const Layout = styled.div`
background-image: ${({ src }) => `url(${src})`};
background-size: cover;
background-position: right center;
background-repeat: no-repeat;
width: 100vw; 
height: 100%;
display:flex;
flex-direction: column;
align-items:center;
justify-content: center;
`;

const ButtonBox = styled.div`
display: flex;
flex-direction: column;
`
const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center; 

  color: white;
  font-size: 35px;
  text-decoration: none;
`;

const LogoLinkBeforeLogin = styled(NavLink)`
  display: flex;
  align-items: center; 
  justfiy-content: center;
  color: white;
  font-size: 60px;
  text-decoration: none;
`;
const Nav = styled.div`
  top: 0;
  display: grid;
  grid-template-columns: auto auto auto; 
  align-items: center;
  justify-content: space-evenly;

  height: 100px;
  width: 100%;
  z-index: 2000;
`;





export default RootLayout;