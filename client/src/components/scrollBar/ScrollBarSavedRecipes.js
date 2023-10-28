import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { saveRecipe, removeRecipe } from '../../../slices/savedRecipesSlice'


const ScrollBarSavedRecipes = (id) => {
  // const { savedRecipes } = useSelector((state) => state.savedRecipes);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // const dispatch = useDispatch();

  // Upon the page loading, get request to API and render cards
  useEffect(() => {
    async function fetchSavedRecipe() {

      const reqOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        }
      };

      const response = await fetch(`http://localhost:3000/recipes/getRecipeInformationBulk/${id.id}`, reqOptions)
        .catch((err) => {throw new Error(err);});
      const data = await response.json();
      // dispatch(removeRecipe());
      // dispatch(saveRecipe(data));
      
      for (let i = 0; i < data.length; i++) {
        console.log('DATA1', data[i])
        setSavedRecipes((savedRecipes) => [...savedRecipes, data[i]])
        console.log('SAVEDRECIPES', savedRecipes)
      }
    }

    fetchSavedRecipe();
  }, []);


  
  const cardsRow = [];
  for (let i = 0; i < savedRecipes.length; i++) {
    cardsRow.push(<FlipCard className='FlipCard' id={savedRecipes[i].id} key={savedRecipes[i].id} recipeInfo={savedRecipes[i]}/>)
  }

  return (
    <Wrapper className='ScrollBar__Container'>

      <Header className='Header_Saved'>
        <Title>Saved Recipes:</Title>
      </Header>

      <CardsContainer className='CardsSaved_Container'>
        {cardsRow}
        {/* <FlipCard className='FlipCard' id={id.id} key={id.id} recipeInfo={savedRecipes}/> */}
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
font-size: 24px;
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


export default ScrollBarSavedRecipes; 