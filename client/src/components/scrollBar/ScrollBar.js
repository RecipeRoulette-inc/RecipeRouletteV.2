import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populate, clear } from '../../../slices/randomRecipesSlice'


const ScrollBar = () => {
  const { randomRecipes } = useSelector((state) => state.randomRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    // query API for 10 recipes
    // get data from API

    // update Redux state based on data from API

    // distribute recipe info among all FlipCard components to invdividually render each recipe appropriately

  }, []);



  // eventually have this map to the 10 recipes queried from the API
  const Cards = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => <FlipCard id={letter} key={letter}/>)

  return (
    <Wrapper>
      {Cards}
    </Wrapper>
)
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
width: 70vw;
gap: 1rem; 
flex-wrap:nowrap;
overflow-x: auto;
padding: 1.5rem 1.5rem;

div {
  flex: 0 0 350px;
}
`;


export default ScrollBar; 