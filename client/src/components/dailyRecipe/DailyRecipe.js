import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populateDaily, clearDaily } from '../../../slices/dailyRecipeSlice'
import { Card } from "@mui/material";


const DailyRecipe = () => {
  const { dailyRecipe } = useSelector((state) => state.dailyRecipe);
  const dispatch = useDispatch();

  const { id, title, image, servings, readyInMinutes } = dailyRecipe;

  useEffect(() => {
    async function fetchDailyRandomRecipe() {

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
      dispatch(clearDaily());
      // using data.recipes[0] because it'll return an array of whatever the number opts is in the recipe controller.
      // I don't wanna do any more work... ;(
      dispatch(populateDaily(data.recipes[0]));
    }

    fetchDailyRandomRecipe();
  }, []);

  return (
    <Wrapper>
        <DailyPhoto src={image}></DailyPhoto>
        
            <h1>Recipe of the Day:</h1>
            <h2>{title}</h2>
            <h3>Ready in: {readyInMinutes} minutes</h3>
            <h3>Servings: {servings}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
direction: flex;
flex-direction: row;
align-items: center;
// width: 300px;
// height: 150px;
// background: var(--clr-bg);
border-radius: 1rem;
border: 4px solid rgba(0, 0, 0);
`;

const DailyPhoto = styled.img`
display: flex;
object-fit: cover;
align-items: center;
height: 100px;
width: 100px;
// margin: 25px;
border: 1px solid black;
border-radius: 1rem;
`

// const Photo = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// background-color: rgb(255,255,255);
// // border: 1px solid black;
// border-radius: 1rem;
// gap: 10px;
// `;


export default DailyRecipe; 