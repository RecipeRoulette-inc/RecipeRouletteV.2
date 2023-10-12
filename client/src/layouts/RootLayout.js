import styled, {createGlobalStyle} from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';

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
  return (
    <Layout>
      <GlobalStyle/>
      <Header>
        <Nav>
          <h1>Recipe Roulette</h1>
          <SearchBar/>
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
flex-direction: row;
`;

const Main = styled.main`
max-width: 1200px; 
margin: 40px auto; 
`;

export default RootLayout;