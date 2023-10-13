import styled from 'styled-components'; 
import { useLoaderData } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams(); 

  const recipe = useLoaderData(); 

  return (<
    PageWrapper>
    <h1> Recipe for {recipe.title}</h1>
    {recipe}
  </PageWrapper>)
}; 

// loader function 
export const singleRecipeLoader = async ({params}) => {
  const { id } = params; 

  const res = await fetch('http://localhost:3000/recipes/' + id); 

  return res.json(); 
  
}; 

export default RecipePage; 

const PageWrapper = styled.div``; 