import styled from 'styled-components';
import RecipeImage from "./RecipeImage";
// import RecipeSource from "./RecipeSource";
import RecipeTitle from "./RecipeTitle";
import RecipeBadge from "./RecipeBadge";
import RecipeTime from "./RecipeTime";

const RecipeCard = ({ recipe }) => {
  
  const {
    title,
    image, 
    readyInMinutes: time,
    sourceName, 
    sourceUrl, 
    spoonacularSourceUrl,
    dairyFree,
    glutenFree,
    vegan,
    vegetarian,
    cheap
  } = recipe[0]; 

  const badges = [{type: 'dairyFree', value: dairyFree}, {type: 'glutenFree', value: glutenFree}, {type: 'vegan', value: vegan}, {type: 'vegetarian', value: vegetarian}]; 

  return (
    <Card>
      <RecipeImage imgUrl={image} />
      <RecipeTime time={time} />
      <RecipeTitle title={title} />
      <RecipeBadge types={badges}/>
      {/* <RecipeSource /> */}
    </Card>
  )
  
}; 

const Card = styled.div`
display:flex;
flex-direction: column;
position: relative;
border: 1px solid black;
`;

export default RecipeCard;