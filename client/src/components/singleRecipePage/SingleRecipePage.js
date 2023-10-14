import { Photo } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

function SingleRecipePage() {
    const loaderData = useLoaderData();
    const recipe = loaderData[0];

    return (
        <Wrapper>
          <PhotoContainer>
            <SinglePhoto src={recipe.image}></SinglePhoto>
            </PhotoContainer>
      
            <h1>{recipe.title}</h1>
            <br></br>
            
            <h2>Ready In: {recipe.readyInMinutes} minutes</h2>

            <h2>Servings: {recipe.servings}</h2>
        
            {recipe.diets.length !== 0 && (
            <ul>{recipe.diets.map((e)=> {
                return (<li>{e}</li>)
            })}</ul>
            )}
            
            <br></br>

            <h2>Instructions:</h2>
            <p>{recipe.instructions}</p>
            <br></br>

            <h2>Sources: {recipe.sourceName}</h2>
            <a src={recipe.sourceUrl}>{recipe.sourceUrl}</a>
            <br></br>

            <h2>Spoonacular API Source:{recipe.spoonacularSourceUrl}</h2>
            
            <h2>Credits:{recipe.creditsText} </h2>

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
width: 70vw;
background-color: rgb(255,255,255);
border: 5px solid rgba(0, 0, 0, 1);
border-radius: 1rem; 
`;

const SinglePhoto = styled.img`
display: flex;
object-fit: contain;
align-items: center;
height: 500px;
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