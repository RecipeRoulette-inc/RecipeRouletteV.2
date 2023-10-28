import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { save } from '../../../slices/flipCardSlice'
import { saveRecipe, removeRecipe } from '../../../slices/savedRecipesSlice'
import { Link } from 'react-router-dom';
import { getRecipeInformationBulk } from '../singleRecipePage/SingleRecipePage';

const FlipCard = ({ recipeInfo }) => {
  const [nutritionLabel, setNutritionLabel] = useState();
  const { savedRecipes } = useSelector((state) => state.savedRecipes);
  const { saved } = useSelector((state) => state.flipCard);
  const dispatch = useDispatch();

  const { id, title, image } = recipeInfo;
  

  useEffect(() => {
    async function getRecipeNutritionLabel() {
      console.log('-------> RECIPE INFO: ', recipeInfo);
      console.log('-------> ID: ', id);
      try {
        const response = await fetch(`http://localhost:3000/recipes/nutritionLabel/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
  
        setNutritionLabel(dataUrl);
  
        console.log('dataUrl', dataUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    getRecipeNutritionLabel();
  }, []);
  
  

  function handleSaveRecipe(e) {
    e.preventDefault();

    // JC: Save recipe if not saved.
    if (saved === false) {
      // getRecipeNutritionLabel();
      dispatch(save());
    }
    // JC: Remove recipe if saved.
    else {
      // ----CURRENTLY TESTING JUST SAVE----
      // dispatch(unsave());
      // dispatch(removeRecipe(index));
      // savedRecipes.slice(index, 1);
    }

    const reqOptions = {
      method: 'PATCH',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(savedRecipes)
        // Only want an individual recipe before sending
    };

    fetch('http://localhost:3000/recipes/updateSavedRecipes', reqOptions)
      .catch((err) => {throw new Error(err);});
  }


  return (
    <Wrapper>

      <Card>
        <Front bg={image}>
        </Front>

        <Back>
          <center style={{width: '320px', height: '270px'}}>
            {/* <h1>Ready In: {readyInMinutes} minutes</h1> */}
            {/* <h2>Servings: {servings}</h2> */}
            <img src={nutritionLabel}></img>
    
            {/* <button onClick={getRecipeInformationBulk(id)}>LOADER TEST</button> */}
            {/* <Link to={'/' + id} >More Info</Link> */}
            {/* <h2><Link to='NEED PATH HERE'><button oncli>More Info</button></Link></h2> */}
            
          </center>
        </Back>

      </Card>


      <FrontHeader>
        <h3>{title}</h3>
        <SaveButton onClick={(e)=>handleSaveRecipe(e)}>SAVE</SaveButton>
      </FrontHeader>

    </Wrapper>
  )
};

// height before: 500px
const Wrapper = styled.div`
width: 320px; 
height: 380px; 
perspective: 2000px; 
`;

// adjusted height and moved Card to 'top' of the wrapper to make room for save button and info
const Card = styled.div`
height: 270px;
width: 100%; 
position:relative; 
transition: transform 1500ms;
transform-style: preserve-3d;

${Wrapper}:hover & {
  cursor: pointer; 
  transform: rotateY(180deg);
}
`;

const Front = styled.div`
height: 100%;
width: 100%;
border-radius: 1rem; 
border-style: solid;
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
background-image: url(${(props) => props.bg});
background-repeat: no-repeat;
background-size: cover;
position: absolute;
backface-visibility:hidden;
`;



const Back = styled.div`
height: 100%;
width:100%;
border-radius: 1rem; 
border-style: solid;
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
position:absolute;
backface-visibility:hidden;
transform: rotateY(180deg);
background-color: rgba(255, 255, 255, 0.5);
display:flex;
flex-direction: column;
justify-content: center; 
align-items:center;
gap: 5rem;
overflow: scroll;
`;

const NutritionLabel = styled.div`
height: 270px;
width: 320px;  
`;

//background-color: rgb(252,252,255);
const FrontHeader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-shadow: 1px 1px #F3F3F3;
h3 {
  text-align: center;
}
`;

const SaveButton = styled.button`
background: black;
color: white;
border-radius: 1rem;
width: 60px;
padding: 4px;
`


export default FlipCard; 