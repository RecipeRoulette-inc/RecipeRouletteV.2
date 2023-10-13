import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populateUnder30, clearUnder30, queryEnded } from '../../../slices/queryRecipesSlice'
import { Card } from "@mui/material";


const ScrollBarUnder30 = () => {
  const { queryRecipes, queryRecipesUnder30State, queryStatus } = useSelector((state) => state.queryRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    async function sendUnder30Opts() {

      const reqOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          opts: {
            maxReadyTime: 30,
            number: 3,
            sort: 'random'
          }
        })
      };

      const response = await fetch('http://localhost:3000/recipes/searchRecipes', reqOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log('sendUnder30Opts data: ', data);
          dispatch(clearUnder30(data));
          dispatch(populateUnder30(data));
        })
        .catch((err) => {throw new Error(err);});
      // const data = await response.json();
    }

  
    // for (let i = 0; i < queryRecipes.length; i++) {
    //     if (queryRecipes[i].readyInMinutes <= 30) {
    //       console.log('queryRecipes under thirty: ', queryRecipes[i]);
    //         queryRecipesUnder30.push(queryRecipes[i]);
    //     }
    // }

    sendUnder30Opts();
  }, []);

   const cardsRowUnder30 = [];

   for (let i = 0; i < queryRecipesUnder30State.length; i++) {
     console.log('CREATING FLIP CARDS: ', queryRecipesUnder30State[i]);
     cardsRowUnder30.push(<FlipCard id={i} key={i} recipeInfo={queryRecipesUnder30State[i]}/>)
   }

   return (
    <Wrapper>
      <Header>
        <h1>Under 30min:</h1>
      </Header> 
      
      <CardsContainer>
        {cardsRowUnder30}
      </CardsContainer>
     </Wrapper>
   );

};

const Wrapper = styled.div`
display: flex;
flex-direction: column;

`;

const Header = styled.div`
display: flex;
flex-direction: row;
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

export default ScrollBarUnder30; 