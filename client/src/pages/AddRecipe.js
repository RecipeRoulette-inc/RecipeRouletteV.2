import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { uploadRecipe, changeRecipeName, changeCountry, changeInstructions, clearFields } from '../../slices/uploadRecipeSlice';

const cuisine = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek',
  'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic',
  'Southern', 'Spanish', 'Thai', 'Vietnamese'];

const cuisineMapped = cuisine.map((type, index) => (
  <option key={index} value={type}>
    {type}
  </option>
));

// const diets = [
//   "Gluten Free",
//   "Ketogenic",
//   "Vegetarian",
//   "Lacto-Vegetarian",
//   "Ovo-Vegetarian",
//   "Vegan",
//   "Pescetarian",
//   "Paleo",
//   "Primal",
//   "Low FODMAP",
//   "Whole30"
// ];

// const dietsMapped = diets.map((type, index) => (
//   <option key={index + '2'} value={type}></option>
// ));

// const intolerances = [
//   "Dairy",
//   "Egg",
//   "Gluten",
//   "Grain",
//   "Peanut",
//   "Seafood",
//   "Sesame",
//   "Shellfish",
//   "Soy",
//   "Sulfite",
//   "Tree Nut",
//   "Wheat"
// ];

// const allergenMapped = intolerances.map((type, index) => (
//   <option key={index + '1'} value={{ type }}></option>
// ));

function RecipeUploadForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const testdata = useSelector((state) => state.uploadRecipes)
  console.log(testdata)
  const [recipeData, setRecipeData] = useState({
    recipeName: '',
    ingredients: [],
    instructions: '',
    dietTags: [],
    allergyTags: [],
    countryOfOrigin: '',
    image: null,
  });

  const handleRecipeChange = (e) => {
    const { value } = e.target;
    dispatch(changeRecipeName(value));
    console.log(value, 'input')
  };

  const handleInstructionsChange = (e) => {
    const { value } = e.target;
    dispatch(changeInstructions(value));
    console.log(value, 'input')
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    dispatch(changeCountry(value));
  };

  const handleKeyPress = (e, actionCreator) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      dispatch(actionCreator('Backspace'));
    }
  };

  const handleArrayInputChange = (e, type) => {
    const newValue = e.target.value;

    setRecipeData({
      ...recipeData,
      [type]: newValue.split(',').map((item) => item.trim()),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setRecipeData({
      ...recipeData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonData = {
      recipe_name: testdata.recipeName,
      instructions: testdata.instructions,
      country_origin: testdata.countryOfOrigin,
      ingredients: recipeData.ingredients,
      diets: recipeData.dietTags,
      allergens: recipeData.allergyTags,
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(jsonData));
    formData.append('image', recipeData.image);

    // recipeData.ingredients.forEach((ingredient) => {
    //   formData.append('ingredients[]', ingredient);
    // });

    // recipeData.dietTags.forEach((diet) => {
    //   formData.append('dietTags[]', diet);
    // });

    // recipeData.allergyTags.forEach((allergy) => {
    //   formData.append('allergyTags[]', allergy);
    // });

    fetch('http://localhost:3000/profile/uploadRecipe', {
      method: 'POST',
      credentials: 'include',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({
      //   recipe_name: testdata.recipeName,
      //   instructions: testdata.instructions,
      //   country_origin: testdata.countryOfOrigin,
      //   // image: recipeData.image,
      //   ingredients: recipeData.ingredients,
      //   diets: recipeData.dietTags,
      //   allergens: recipeData.allergyTags,
      // }),
      body: formData,
    }).
      then((res) => {
        if (!res.ok) {
          throw new Error('Network response failed');
        };
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        dispatch(uploadRecipe(data));
        dispatch(clearFields());
        navigate('/profile');
      })
      .catch((err) => {
        console.error('Error uploading recipe: ', err);
      });
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Upload Your Recipe</h2>
        <StyledDiv>
          <label>Recipe Name</label>
          <StyledInput
            type="text"
            name="recipeName"
            value={testdata.recipeName}
            onChange={handleRecipeChange}
            onKeyDown={(e) => handleKeyPress(e, changeRecipeName)}
            placeholder="Recipe Name"
          />
        </StyledDiv>

        <StyledDiv>
          <label>Ingredients</label>
          <StyledInput
            type="text"
            name="ingredients"
            value={recipeData.ingredients.join(', ')}
            onChange={(e) => handleArrayInputChange(e, 'ingredients')}
            placeholder='Ingredients (comma-separated)'
          />
        </StyledDiv>

        <StyledDiv>
          <label>Instructions</label>
          <StyledInput
            type="text"
            name="instructions"
            value={testdata.instructions}
            onChange={handleInstructionsChange}
            onKeyDown={(e) => handleKeyPress(e, changeInstructions)}
            placeholder="Recipe Instructions"
          />
        </StyledDiv>

        <StyledDiv>
          <label>Diet Tags</label>
          <StyledInput
            type="text"
            name="dietTags"
            value={recipeData.dietTags.join(', ')}
            onChange={(e) => handleArrayInputChange(e, 'dietTags')}
            placeholder="Diet Tags (comma-separated)"
          />
        </StyledDiv>

        <StyledDiv>
          <label>Allergy Tags</label>
          <StyledInput
            type="text"
            name="allergyTags"
            value={recipeData.allergyTags.join(', ')}
            onChange={(e) => handleArrayInputChange(e, 'allergyTags')}
            placeholder="Allergy Tags (comma-separated)"
          />
        </StyledDiv>

        <StyledDiv>
          <label>Country of Origin</label>
          <select
            name="countryOfOrigin"
            value={testdata.countryOfOrigin}
            onChange={handleCountryChange}
          >
            <option value="">Select Country of Origin</option>
            {cuisineMapped}
          </select>
        </StyledDiv>

        <StyledDiv>
          <label>Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </StyledDiv>

        <StyledDivBtn>
          <StyledButton type="submit">Submit Recipe</StyledButton>
        </StyledDivBtn>
      </StyledForm>
    </StyledContainer>
  );
};

export default RecipeUploadForm;

const StyledContainer = styled.section`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  border-radius: 40px;
  height: 80%;
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  background-color: #f3f5ed; 
  margin-top: 30px;
  overflow-y: hidden;
  overflow-x: hidden;
`

const StyledForm = styled.form`
  padding: 10px;`

const StyledDiv = styled.div`
padding: 5px;
margin: 10px;
display: flex;
justify-content: space-between;
align-items: center;
color: #333436;
`

const StyledInput = styled.input`
width: auto;
padding: 18px;
border: 1px solid #ccc;
border-radius: 5px;
`

const StyledButton = styled.button`
background-color: #4caf50;
color: white;
padding: 10px;
margin-top: 10px;
margin: 0;
border: none;
border-radius: 5px;
cursor: pointer;
&:disabled {
  opacity: 0.5;
}
&:enabled {
  opacity: 1.0;
}
opacity: ${props => !props.enabled ? 0.5 : 1};
`

const StyledDivBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`