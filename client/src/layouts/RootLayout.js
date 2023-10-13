import styled, {createGlobalStyle} from 'styled-components';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { queryMade, populateMain, clearMain } from '../../slices/queryRecipesSlice';

import SearchBar from '../components/searchBar/SearchBar';
// import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/bw images/fast-food-doodles-hand-drawn-colorful-vector-symbols-objects_217204-778.jpg";
import img from "../public/mainBackground.jpg"

//add fonts here
const GlobalStyle = createGlobalStyle`
* {
    // margin: auto; 
    // padding: 10px 10px; 
    box-sizing: border-box;
    font-family: 'Chelsea Market';
}

:root {
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
}
`;

const RootLayout = () => {

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
        
        return res.json();
      })
      .then((data) => {
        // console.log('-------> THEN DATA FROM ROOT LAYOUT: ', data);
        dispatch(clearMain());
        dispatch(populateMain(data));
        dispatch(queryMade());
        // console.log('-------> RootLayout queryRecipes: ', queryRecipes);
      })
      .catch((error) => {
        console.error(error);
    })
  }

  return (
    <Layout src={img}>
      <GlobalStyle/>
      <Header>
        <Nav>
          <Logo>Recipe Roulette</Logo>
          <SearchBar onSubmit={onSubmit} />
          <ButtonBox>
          <LoginLink to='/login'>Login</LoginLink>
          <SignUpLink to='/signup'>Signup</SignUpLink>
          </ButtonBox>
        </Nav>
      </Header>
      <Main>
        <Outlet/>
      </Main>
    </Layout>
  )
}; 

const Layout = styled.div`
display: flex;
flex-direction: column;
background-image: ${({src}) => `url(${src})`};
background-size: 50%;
display:flex;
align-items:center;
justify-content: center;
margin: auto;
padding: 115px 50px;
`;

const Header = styled.header`
display: flex;
justify-content: center;
align-text: center;
margin: 0 auto;
background: #ee6352;
border-radius: 15px;
padding: 15px 15px;
`;

const Logo = styled.h1`
  // background: red;
  display: flex;
  // align-text: center;
  justify-content: center;
  font-size: 30px;
`;

const Nav = styled.nav`
display: flex;
gap: 16px;
justify-content: end
max-width: 1200px;
margin: 0 auto;


`;

const Main = styled.main`
display: flex;
justify-content: center;
align-content: center;
max-width: 1200px; 
min-width: 600px;
margin: 40px auto; 
padding: 30px ;
`;

const LoginLink = styled(NavLink)`
display: flex;
justify-content: center;
background-color: black;
color: white;
height: 60px;
width: 80px;
border-radius: 1rem;
padding: 16px;
`
const SignUpLink = styled(NavLink)`
display: flex;
justify-content: center;
background-color: black;
color: white;
height: 60px;
width: 80px;
border-radius: 1rem;
padding: 16px;
`


const ButtonBox = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`

export default RootLayout;