import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form'; 

const SearchBar = ({onSubmit}) => {
  const { register, handleSubmit, watch } = useForm();

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <SearchBarWrapper>
        <SearchInput
          minLength='1'
          required
          {...register('query')}
          placeholder='hungry for?'
          aria-label='search'
        />
        <SearchButton type="submit" aria-label='submit search'>
          <FontAwesomeIcon icon={faCutlery} />
        </SearchButton>
      </SearchBarWrapper>

      <label>Cuisine: </label>
      <select name="cuisine" {...register('opts.cuisine')} > 
        <option value="">
        <em>None</em>
        </option>
        <option value="American">American</option>
        <option value="Thai">Thai</option>
        <option value="Japanese">Japanese</option>
      </select>

      <label>Intolerances: </label>
      <select name="intolerances" {...register('opts.intolerances')}>
        <option value="">
        <em>None</em>
        </option>
        <option value="Gluten">Gluten</option>
        <option value='Shellfish'>Shellfish</option>
        <option value='Tree Nut'>Tree Nut</option>
      </select>

      <label>Diet: </label>
      <select name="diet" {...register('opts.diet')} >
        <option value="">
          <em>None</em>
        </option>
        <option value="Gluten Free">Gluten Free</option>
        <option value="Ketogenic">Ketogenic</option>
        <option value="Vegetarian">Vegetarian</option>
      </select>
    </Wrapper>
  )
};


const Wrapper = styled.form`
background:white; 
width: 70vw;
padding: 3em;
box-shadow: 0 0 3em rgba(0,0,0,.15);
position: relative;
`; 

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

&:focus-within, 
input:valid {
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

}

`;

const SearchButton = styled.button`
  font-size: 1.5rem;
  cursor: pointer; 
  border: 0; 
  background: transparent; 
  border-radius: 50%;
  width: calc(var(--size) - 10px);
  height: calc(var(--size) - 10px);
  margin-left: auto; 
  transition: background 150ms ease-in-out;
`;

const SearchInput = styled.input`
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
`;


export default SearchBar; 