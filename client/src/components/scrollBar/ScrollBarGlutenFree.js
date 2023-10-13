import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populate, clear } from '../../../slices/queryRecipesSlice'


const ScrollBarUnder30 = () => {
  const { queryRecipes,  queryStatus } = useSelector((state) => state.queryRecipes);
  const queryRecipesGluttenFree = [];
  const dispatch = useDispatch();

  // queryStatus must change from searchBar and must get data from searchBar request
  useEffect(() => {
    for (let i = 0; i < queryRecipes.length; i++) {
        if (queryRecipes[i].gluttenFree === true) {
            queryRecipesGluttenFree.push(queryRecipes[i]);
        }
    }

    dispatch(clearMain());
    dispatch(populateMain(queryRecipesGluttenFree));

    const cardsRow = [];
    for (let i = 0; i < queryRecipesGluttenFree.length; i++) {
      cardsRow.push(<FlipCard id={i} key={i} recipeInfo={queryRecipesGluttenFree[i]}/>)
    }

    return (
      <Wrapper>
  
        <div>
          <h1>Glutten Free:</h1>
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