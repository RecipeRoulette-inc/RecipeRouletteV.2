import React, { useState, useRef} from 'react';
import styled from "styled-components";


const cuisine = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek',
'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic',
'Southern', 'Spanish', 'Thai', 'Vietnamese'];

const cuisineMapped = cuisine.map((type, index) => (
  <option key={index} value={type}>
    {type}
  </option>
));

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30"
];

const dietsMapped = diets.map((type, index) => (
<option key={index + '2'} value={type}></option>
));

const intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat"
];

const allergenMapped = intolerances.map((type, index) => (
<option key={index  + '1'} value={{type}}></option>
));

function RecipeUploadForm() {
  const [recipeData, setRecipeData] = useState({
    recipeName: '',
    ingredients: [''],
    instructions: [''],
    dietTags: '',
    allergyTags: '',
    countryOfOrigin: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleArrayInputChange = (e, index, type) => {
    const newValue = e.target.value;
    const updatedArray = [...recipeData[type]];
    updatedArray[index] = newValue;

    setRecipeData({
      ...recipeData,
      [type]: updatedArray,
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

  };

  return (
    <StyledForm>
      <div>
        <label>Recipe Name</label>
        <input
          type="text"
          name="recipeName"
          value={recipeData.recipeName}
          onChange={handleInputChange}
          placeholder="Recipe Name"
        />
      </div>

      <div>
        <label>Ingredients</label>
        {recipeData.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleArrayInputChange(e, index, 'ingredients')}
            placeholder="Ingredient"
          />
        ))}
      </div>

      <div>
        <label>Instructions</label>
        {recipeData.instructions.map((instruction, index) => (
          <textarea
            key={index}
            value={instruction}
            onChange={(e) => handleArrayInputChange(e, index, 'instructions')}
            placeholder="Instruction"
          />
        ))}
      </div>

      <div>
        <label>Diet Tags</label>
        <select
          name="dietTags"
          value={recipeData.dietTags}
          onChange={handleInputChange}
        >
          <option value="">Select Diet Tags</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Paleo">Paleo</option>
        </select>
      </div>

      <div>

        <label>Allergy Tags</label>
        <select
          name="allergyTags"
          value={recipeData.allergyTags}
          onChange={handleInputChange}
        >
          <option value="">Select Allergy Tags</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Nut-Free">Nut-Free</option>
          <option value="Dairy-Free">Dairy-Free</option>
          
        </select>
      </div>

      <div>
        <label>Country of Origin</label>
        <select
          name="countryOfOrigin"
          value={recipeData.countryOfOrigin}
          onChange={handleInputChange}
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
  )
}

export default RecipeUploadForm;

const StyledForm = styled.form`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  border-radius: 40px;
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;

`