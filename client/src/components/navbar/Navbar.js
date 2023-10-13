import styled from 'styled-components';
import SearchBar from '../searchBar/SearchBar';

const Navbar = ({children}) => {
  return (
    <NavbarWrapper>
       <SearchBar/>
    </NavbarWrapper>
); 
}; 

const NavbarWrapper = styled.div`
display: flex; 
align-items: center;
justify-content: center;
position:fixed;
z-index: 400;
width: 100%;
height: 100px;
background: white;
border: 1px solid black;
`; 

const StyledHeader = styled.header`

`;

export default Navbar; 