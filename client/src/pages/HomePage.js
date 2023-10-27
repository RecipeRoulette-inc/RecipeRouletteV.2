// libraries
import { useContext } from 'react';
import styled from 'styled-components';
import { useLoaderData, Link } from 'react-router-dom';

import { AuthContext } from '../App';

// components
import SearchBar from '../components/searchBar/SearchBar';
import ScrollBarRandom from '../components/scrollBar/ScrollBarRandom';
import ScrollBarUnder30 from '../components/scrollBar/ScrollBarUnder30';
import ScrollBarVegan from '../components/scrollBar/ScrollBarVegan';
import ScrollBarGlutenFree from '../components/scrollBar/ScrollBarGlutenFree';
import DailyRecipe from '../components/dailyRecipe/DailyRecipe';

// hooks 
import useAuth from '../components/hooks/useAuth';
  
const HomePage = () => {
  const { token } = useAuth();

  const handleGetRandomRecipe = () => {

    fetch('http://localhost:3000/recipes', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ error }) => {
            // create an Error object from error property or response statusText
            throw new Error(error|| res.statusText)
          })
        }
        
        return res.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error); 
      })
  }; 

  return (
    <Wrapper>
    
      <DailyRecipe/>
      <ScrollBarRandom />
      <ScrollBarUnder30 />
      <ScrollBarVegan />
    </Wrapper>
    
  )
};

//loader function
export const bulkRecipesLoader = async () => {
  console.log('bulkRecipesLoader')
  const res = await fetch('http://localhost:3000/recipes/randomRecipe'); 
  console.log('Response Received')
  const recipe = await res.json()
  console.log(recipe);
  return recipe;
}

const Wrapper = styled.div`
display: flex;
flex-direction: column; 
gap: 1rem;
`;

// const DailyRecipe = styled.div`
// height: 400px; 
// width: 100%;
// border: 1px solid black;
// background:red;
// `;

const DisplayContainer = styled.div`
display: flex;
flex-direction: row;
width: 70vw;
background-color: #FEFDF5;
`;

export default HomePage;