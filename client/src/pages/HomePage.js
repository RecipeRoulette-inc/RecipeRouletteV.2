import styled from 'styled-components';
import SearchBar from '../components/searchBar/SearchBar';
import ScrollBar from '../components/scrollBar/ScrollBar';

  
const HomePage = () => {

  return (
    <Wrapper>
      <SearchBar />
      <ScrollBar />
    </Wrapper>
  )

};

const Wrapper = styled.div`

`;

export default HomePage;