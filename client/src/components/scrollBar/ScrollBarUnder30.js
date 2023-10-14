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
    <Wrapper className='ScrollBar__Container'>
      <Header className='Header_Under30'>
        <Title>Under 30min:</Title>
      </Header> 
      
      <CardsContainer className='CardsUnder30_Container'>
        {cardsRowUnder30}
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

export default ScrollBarUnder30; 