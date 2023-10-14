import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populate, clear } from '../../../slices/randomRecipesSlice'
import { Card } from "@mui/material";


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
    cardsRow.push(<FlipCard className='FlipCard' id={i} key={i} recipeInfo={randomRecipes[i]}/>)
  }

  return (
    <Wrapper className='ScrollBar__Container'>

      <Header className='Header_Random'>
        <Title>Random:</Title>
      </Header>

      <CardsContainer className='CardsRandom_Container'>
        {cardsRow}
      </CardsContainer>

    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
background-color: rgb(255,255,255);
border-radius: 1rem; 
border: 5px solid rgba(0, 0, 0, 1);
border-style: solid;
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
`;

const Header = styled.div`
display: flex;
flex-direction: row;
margin: 10px;
`;

const Title = styled.div`
padding: 0 0; 
margin: 5px 5px; 
`;

const CardsContainer = styled.div`
display: flex;
flex-direction: row;
width: 70vw;
gap: 2rem; 
flex-wrap:nowrap;
overflow-x: auto;
padding: 1.5rem 1.5rem;

div {
  flex: 0 0 350px;
}
`;


export default ScrollBarRandom; 