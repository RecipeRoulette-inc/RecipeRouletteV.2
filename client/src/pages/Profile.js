import React, { useState, setState, useEffect } from "react";
import styled from "styled-components";

export default function ProfilePage() {

  const [userInfo, setUserInfo] = useState({ username: '', image: '', savedRecipes: '', allergies: '', restrictions: '', uploadedRecipes: [] });
  const [loading, setLoading] = useState(true);
  const [mappedRecipes, setMappedRecipes] = useState([]);

  useEffect(() => {
    getInfo()
  }, [userInfo.savedRecipes]);

  function getInfo() {
    fetch('/profile/userInfo')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const recipeNames = Object.keys(res.uploadedRecipes).map(key => {
          return res.uploadedRecipes[key].recipe_name;
        });
        console.log(recipeNames, 'recipenames');

        setUserInfo({ username: res.username, image: res.imageURL, savedRecipes: res.savedRecipes, allergies: res.allergies, restrictions: res.restrictions, uploadedRecipes: recipeNames });
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(`Error in FETCH /profile/userInfo: ${err}`);
      });
  };

  console.log(userInfo.savedRecipes, 'saved recipes');

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!userInfo.savedRecipes || !Array.isArray(userInfo.savedRecipes)) {
        console.error('saved recipes is not an array');
        return;
      }
      try {
        const recipesData = await Promise.all(userInfo.savedRecipes.map(id => getSavedRecipe(id)));
        console.log(mappedRecipes, 'mappedrecipes');
        setMappedRecipes(recipesData);
      } catch (error) {
        console.error('Error in mapping saved recipes:', error);
      };
      fetchRecipes();
    };
  }, [userInfo.savedRecipes]);

  async function getSavedRecipe(id) {
    const url = `http://localhost:3000/recipes/getRecipeInformationBulk/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('id data', data);
      return data;
    } catch (error) {
      console.error('ERROR FETCHING RECIPE:', error);
      return null;
    }
  }

  // function uploadPhoto() {

  //   fetch('/profile/uploadPhoto')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log('upload status', res)
  //     })
  //     .then(() => alert('Photo uploaded successfully'))
  //     .catch((err) => alert('Error occurred while uploading photo'))
  // };


  if (loading) {
    return <div>loading ...</div>
  } else {

    return (
      <StyledContainer>
        <StyledDiv>
          <div style={{ gridColumn: '1', gridRow: '1 / 5' }}>
            <img src={userInfo.image} width='auto' height='200px'></img>
            <p>{userInfo.username}</p>
            <form action="/profile/uploadPhoto" method='post' enctype="multipart/form-data">
              <input type='file' id='image' name='image' style={{ marginBottom: '5px' }} />
              <input type='submit' />
            </form>
          </div>
          <div>
            <h3>Saved Recipes</h3>
            {/* <h4>{userInfo.savedRecipes}</h4> */}
            {mappedRecipes.map((recipe, index) => (
              <>
                <PhotoContainer>
                  <SinglePhoto src={recipe.image}></SinglePhoto>
                </PhotoContainer>
                <h4 key={index}>Recipe Name: {recipe.title}</h4>
                <h2>Ready In: {recipe.readyInMinutes} minutes</h2>
                <h2>Servings: {recipe.servings}</h2>
              </>
            ))}
          </div>
          <div>
            <h3>Allergies</h3>
            <h4>{userInfo.allergies}</h4>
          </div>
          <div>
            <h3>Dietary Restrictions</h3>
            <h4>{userInfo.restrictions}</h4>
          </div>
          <div>
            <h3>Uploaded Recipes</h3>
            <ul>
              {userInfo.uploadedRecipes.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul></div>
        </StyledDiv>
      </StyledContainer>
    );
  };
};

const SinglePhoto = styled.img`
display: flex;
object-fit: contain;
align-items: center;
margin: 25px;
width: 40px;
border-radius: 1rem;
`

const PhotoContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const StyledContainer = styled.section`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  border-radius: 40px;
  padding: 20px;
  border: none;
  width: 70%;
  background-color: #f3f5ed; 
  margin-top: 30px;
  overflow-y: hidden;
  overflow-x: hidden;
  `

const StyledDiv = styled.div`
display: grid;
grid-template-columns: 1fr 4fr;
grid-template-rows: 1fr;
grid-auto-flow: row;
grid-auto-columns: auto;
align-items: start;
`