import React, { useState, setState, useEffect } from "react";


export default function ProfilePage() {

  const [userInfo, setUserInfo] = useState({ username: '', image: '', savedRecipes: [], allergies: '', restrictions: '', uploadedRecipes: {} });
  const [loading, setLoading] = useState(true);

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

        setUserInfo({ username: res.username, image: res.imageURL, savedRecipes: res.savedRecipes, allergies: res.allergies, restrictions: res.restrictions, uploadedRecipes: recipeNames });
     
      })
      .then(() => setLoading(false))
   
      .catch((err) => {
        console.log(`Error in FETCH /profile/userInfo: ${err}`);
      });
  };



  async function getSavedRecipe(id) {
    const url = `http://localhost:3000/recipes/getRecipeInformationBulk/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ERROR FETCHING RECIPE:', error);
      return null;
    }
  }
  
  const fetchRecipes = async () => {
    const mappedRecipes = await Promise.all(userInfo.savedRecipes.map(id => getSavedRecipe(id)));
    console.log(mappedRecipes)
  };
  
fetchRecipes();
  





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
      <div display='flex' justify-content='center' align-items='center'>
        <img src={userInfo.image} width='auto' height='200px'></img>
        <p display='flex' justify-content='center' align-items='center'>{userInfo.username}</p>
        <br></br>
        <form action="/profile/uploadPhoto" method='post' enctype="multipart/form-data">
          <input type='file' id='image' name='image' />
          <input type='submit' />
        </form>
        <br></br>
        <h3>Saved Recipes</h3>
        <br></br>
        <h4>{getSavedRecipes}</h4>
        <br></br>
        <h3>Allergies</h3>
        <br></br>
        <h4>{userInfo.allergies}</h4>
        <br></br>
        <h3>Dietary Restrictions</h3>
        <br></br>
        <h4>{userInfo.restrictions}</h4>
        <br></br>
        <h3>Uploaded Recipes</h3>
        <br></br>
        <h4>{userInfo.uploadedRecipes.recipeNames}</h4>

      </div>
    )
  }
};




