import styled, {createGlobalStyle} from 'styled-components';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import SearchBar from '../components/searchBar/SearchBar';
import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/bw images/fast-food-doodles-hand-drawn-colorful-vector-symbols-objects_217204-778.jpg";

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

  // const location = useLocation(); 
  // console.log(location);

  const onSubmit = (data) => {
    console.log(data);
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
        console.log(data);
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
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Signup</NavLink>
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
  background: red;
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

export default RootLayout;