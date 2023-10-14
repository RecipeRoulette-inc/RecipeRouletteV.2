import { Photo } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

function SingleRecipePage() {
    const loaderData = useLoaderData();
    const recipe = loaderData[0];

    const ingredients = [];
    for (let i = 0; i < recipe.extendedIngredients.length; i++) {
        let { name, amount, unit } = recipe.extendedIngredients[i];
        ingredients.push({ name, amount, unit});
    }

    let filteredInstructions;
    filteredInstructions = recipe.instructions.replaceAll('<ol>', '');
    filteredInstructions = recipe.instructions.replaceAll('</ol>', '');
    filteredInstructions = filteredInstructions.replaceAll('<li>', '');
    filteredInstructions = filteredInstructions.replaceAll('</li>', '');

    return (
        <Wrapper>
          <PhotoContainer>
            <SinglePhoto src={recipe.image}></SinglePhoto>
            </PhotoContainer>
        
            <TitleContainer>
            <h1>{recipe.title}</h1>
            <h2>Ready In: {recipe.readyInMinutes} minutes</h2>

            <h2>Servings: {recipe.servings}</h2>
            </TitleContainer>
            
    
            <h2>Diet:</h2>
            {recipe.diets.length !== 0 && (
            <ul>{recipe.diets.map((e)=> {
                return (<li>{e}</li>)
            })}</ul>
            )}
          

            <h2>Ingredients:</h2>
            <ul>{ingredients.map((e)=> {
                    return (
                    <li>{`${e.name}, ${e.amount} ${e.unit}`}</li>
                    )
                })}
            </ul>
         

            <h2>Instructions:</h2>
            <p>{filteredInstructions}</p>
            <br></br>

            <h2>Sources: {recipe.sourceName}</h2>
            <a src={recipe.sourceUrl}>{recipe.sourceUrl}</a>


            <h2>Spoonacular API Source:</h2>
            <p>{recipe.spoonacularSourceUrl}</p>
            
            <h2>Credits: {recipe.creditsText} </h2>

        </Wrapper>
    );
}

export const getRecipeInformationBulk = async ({params}) => {
    console.log('getRecipeInformationBulk')

    const id = params.id;
    const res = await fetch(`http://localhost:3000/recipes/getRecipeInformationBulk/${id}`);
    const recipe = await res.json();
    console.log(recipe)
    return recipe;
    
  }


const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 60vw;
background-color: rgb(255,255,255);
border: 5px solid rgba(0, 0, 0, 1);
border-radius: 1rem; 
padding: 20px;
`;

const TitleContainer = styled.div `
display: flex;
flex-direction: column;
align-items: center;
h1 {
    font-size: 36px;
    margin: 4px;
};
h2 {
    font-size: 20px;
    margin: 4px;
}
`

const SinglePhoto = styled.img`
display: flex;
object-fit: contain;
align-items: center;
margin: 25px;
width: 500px;
border-radius: 1rem;
`

const PhotoContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const Title = styled.div`
padding: 0 0; 
margin: 5px 5px; 
font-size: 24px;
`;

// const ListTitle = stlyed.ul`
// font-size: 16px;
// `


export default SingleRecipePage;
