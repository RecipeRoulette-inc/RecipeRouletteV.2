import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populate, clear } from '../../../slices/randomRecipesSlice'


const ScrollBarRandom = () => {
  const { randomRecipes } = useSelector((state) => state.randomRecipes);
  const dispatch = useDispatch();

  // Upon the page loading, get request to API and render cards
  useEffect(() => {
    async function fetchRandomRecipe() {

      const reqOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        }
      };

      const response = await fetch('http://localhost:3000/recipes/randomRecipe', reqOptions)
        .catch((err) => {throw new Error(err);});
      const data = await response.json();
      dispatch(clear());
      dispatch(populate(data.recipes));
    }

    fetchRandomRecipe();
  }, []);

  const cardsRow = [];
  for (let i = 0; i < randomRecipes.length; i++) {
    console.log(randomRecipes[i]);
    cardsRow.push(<FlipCard id={i} key={i} recipeInfo={randomRecipes[i]}/>)
  }

  return (
    <Wrapper>

      <div>
        <h1>Random Recipies: </h1>
      </div>
      
      {cardsRow}
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 70vw;
gap: 1rem; 
flex-wrap:nowrap;
overflow-x: auto;
padding: 1.5rem 1.5rem;

// div {
//   flex: 0 0 350px;
// }
`;


export default ScrollBarRandom; 