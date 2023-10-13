import { Photo } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

function SingleRecipePage() {
    const recipe = useLoaderData()
    console.log(recipe);
    

    return (
        <Wrapper>
            <PhotoContainer bg={image}></PhotoContainer>
            <br></br>

            <p>Title={recipe.title}</p>

            <h1>Recipe Name</h1>
            <br></br>
    
            <h2>Instructions:</h2>
            <br></br>

            <p>Steps</p>
            <br></br>

            <Link to='LINK GOES HERE'>Resource #1</Link>

        </Wrapper>
    );
}

export const getRecipeInformationBulk = async ({params}) => {
    console.log('getRecipeInformationBulk')

    const id = params.id;
  
    fetch(`http://localhost:3000/recipes/getRecipeInformationBulk/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log('Response data', data);
        });
    // console.log('Response Received')
    // console.log('----Response', res); 
    // console.log('----ResponseBody', res.body );
    // const recipe = res.json()
    // console.log(recipe);
    // return recipe;
  }


const Wrapper = styled.div`
display: flex;
flex-direction: row;
width: 70vw;
background-color: #EEF0BF;
`;

const PhotoContainer = styled.div`
display: flex;
flex-direction: center;
width: 600px; 
height: 400px; 
border-radius: 1rem; 
border-style: solid;
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
background-image: url(${(props) => props.bg});
`;


export default SingleRecipePage;