import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populateVegan, clearVegan } from '../../../slices/queryRecipesSlice'


const ScrollBarUnder30 = () => {
  const { queryRecipes, queryRecipesVeganState } = useSelector((state) => state.queryRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    async function sendVeganOpts() {

      const reqOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          opts: {
            diet: 'vegan',
            number: 10,
            sort: 'random'
          }
        })
      };

      const response = await fetch('http://localhost:3000/recipes/searchRecipes', reqOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log('sendVeganOpts data: ', data);
          dispatch(clearVegan(data));
          dispatch(populateVegan(data));
        })
        .catch((err) => {throw new Error(err);});
      // const data = await response.json();
    }

    sendVeganOpts();
  }, []);

   const cardsRowVegan = [];

   for (let i = 0; i < queryRecipesVeganState.length; i++) {
     cardsRowVegan.push(<FlipCard id={i} key={i} recipeInfo={queryRecipesVeganState[i]}/>)
   }

   return (
    <Wrapper className='ScrollBar__Container'>
      <Header className='Header_Vegan'>
        <Title>Vegan:</Title>
      </Header> 
      
      <CardsContainer className='CardsVegan_Container'>
        {cardsRowVegan}
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