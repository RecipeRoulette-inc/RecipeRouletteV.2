import styled, {createGlobalStyle} from 'styled-components';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import SearchBar from '../components/searchBar/SearchBar';

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
    <Layout>
      <GlobalStyle/>
      <Header>
        <Nav>
          <h1>Recipe Roulette</h1>
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
`;

const Header = styled.header`
margin: 0 auto;
`;

const Nav = styled.nav`
display: flex;
gap: 16px;
justify-content: end
max-width: 1200px;
margin: 0 auto;


`;

const Main = styled.main`
max-width: 1200px; 
margin: 40px auto; 
`;

export default RootLayout;