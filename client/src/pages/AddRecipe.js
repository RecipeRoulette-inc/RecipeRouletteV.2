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
    image: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('image', recipeData.image);

    fetch('http://localhost:3000/profile/uploadRecipe', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipe_name: testdata.recipeName,
        instructions: testdata.instructions,
        country_origin: testdata.countryOfOrigin,
        image: recipeData.image,
        ingredients: recipeData.ingredients,
        diets: recipeData.dietTags,
        allergens: recipeData.allergyTags,
      }),
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
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <label>Recipe Name</label>
        <input
          type="text"
          name="recipeName"
          value={testdata.recipeName}
          onChange={handleRecipeChange}
          onKeyDown={(e) => handleKeyPress(e, changeRecipeName)}
          placeholder="Recipe Name"
        />
      </div>

      <div>
        <label>Ingredients</label>
        <input
          type="text"
          name="ingredients"
          value={recipeData.ingredients.join(', ')}
          onChange={(e) => handleArrayInputChange(e, 'ingredients')}
          placeholder='Ingredients (comma-separated)'
        />
      </div>

      <div>
        <label>Instructions</label>
        <input
          type="text"
          name="instructions"
          value={testdata.instructions}
          onChange={handleInstructionsChange}
          onKeyDown={(e) => handleKeyPress(e, changeInstructions)}
          placeholder="Recipe Instructions"
        />
      </div>

      <div>
        <label>Diet Tags</label>
        <input
          type="text"
          name="dietTags"
          value={recipeData.dietTags.join(', ')}
          onChange={(e) => handleArrayInputChange(e, 'dietTags')}
          placeholder="Diet Tags (comma-separated)"
        />
      </div>

      <div>
        <label>Allergy Tags</label>
        <input
          type="text"
          name="allergyTags"
          value={recipeData.allergyTags.join(', ')}
          onChange={(e) => handleArrayInputChange(e, 'allergyTags')}
          placeholder="Allergy Tags (comma-separated)"
        />
      </div>

      <div>
        <label>Country of Origin</label>
        <select
          name="countryOfOrigin"
          value={testdata.countryOfOrigin}
          onChange={handleCountryChange}
        >
          <option value="">Select Country of Origin</option>
          {cuisineMapped}
        </select>
      </div>

      <div>
        <label>Image Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <button type="submit">Submit Recipe</button>
    </StyledForm>
  );
};

export default RecipeUploadForm;

const StyledForm = styled.form`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  border-radius: 40px;
  height: vh;
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`