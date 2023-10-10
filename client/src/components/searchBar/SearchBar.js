import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCutlery } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchInput
          placeholder='hungry for?'
          aria-label='search'
        />
        <SearchButton aria-label='submit search'>
          <FontAwesomeIcon icon={faCutlery} />
        </SearchButton>
      </SearchBarWrapper>
    </Wrapper>
  )
};

const Wrapper = styled.div`
background:white; 
width: 70vw;
padding: 3em;
box-shadow: 0 0 3em rgba(0,0,0,.15);
position: relative;
`; 
const Form = styled.form``;
const Select = styled.select``;

const SearchBarWrapper = styled.div`
--size: 60px; 
display: flex; 
border: 2px solid var(--clr-primary);
border-radius: 1000px; 
height: var(--size);
width: var(--size);
padding: 3px; 
position: relative; 
transition: width 450ms cubic-bezier(0.68, -0.55, 0.27, 1.15);
overflow: hidden;

input {
  flex-grow: 1;
  font-size: 1.5rem;
  padding: 0 0.5rem;
  border: 0; 
  position: absolute; 
  top: 0; 
  bottom: 0;
  left: 0; 
  opacity: 0;
  cursor: pointer; 

  &:focus {
    outline: 0; 
  }
}

button {
  font-size: 1.5rem;
  cursor: pointer; 
  border: 0; 
  background: transparent; 
  border-radius: 50%;
  width: calc(var(--size) - 10px);
  height: calc(var(--size) - 10px);
  margin-left: auto; 
  transition: background 150ms ease-in-out;
}

&:focus-within {
  width: 100%;

  input {
    opacity: 1;
    cursor: initial;  
    width: calc(100% - var(--size));
  }

  button{
    background: var(--clr-primary);
    color:white;

  &:focus,
  &:hover {
    outline: 0; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

    }
  }
}

`;

const SearchButton = styled.button``;
const SearchInput = styled.input``;

export default SearchBar; 