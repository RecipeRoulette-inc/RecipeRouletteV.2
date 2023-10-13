import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populate, clear, clearGlutenFree, populateGlutenFree } from '../../../slices/queryRecipesSlice'


const ScrollBarVegan = () => {
  const { queryRecipes, queryRecipesGlutenFreeState, queryStatus } = useSelector((state) => state.queryRecipes);
  const queryRecipesGlutenFree = [];
  const dispatch = useDispatch();

  // queryStatus must change from searchBar and must get data from searchBar request
  useEffect(() => {
    for (let i = 0; i < queryRecipes.length; i++) {
        if (queryRecipes[i].GlutenFree === true) {
            queryRecipesGlutenFree.push(queryRecipes[i]);
        }
    }

    dispatch(clearGlutenFree());
    dispatch(populateGlutenFree(queryRecipesGlutenFree));

    const cardsRow = [];
    for (let i = 0; i < queryRecipesGlutenFreeState.length; i++) {
      cardsRow.push(<FlipCard id={i} key={i} recipeInfo={queryRecipesGlutenFreeState[i]}/>)
    }

    return (
      <Wrapper>
  
        <div>
          <h1>Under 30min:</h1>
        </div>
        
        {cardsRow}

      </Wrapper>
    );

  }, [queryStatus]);


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


export default ScrollBarUnder30; 