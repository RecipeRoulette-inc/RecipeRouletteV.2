import React, { useState, setState, useEffect } from "react";
import ScrollBarSavedRecipes from "../components/scrollBar/ScrollBarSavedRecipes";
import DropDown from "../components/profile/DropDown";
import styled from "styled-components";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({ username: '', image: '', savedRecipes: '', allergies: '', restrictions: '', uploadedRecipes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfo()
  }, []);


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
        console.log(res)
        setUserInfo({ username: res.username, image: res.imageURL, savedRecipes: res.savedRecipes, allergies: res.allergies, restrictions: res.restrictions, uploadedRecipes: recipeNames })
      })
      .then(() => setLoading(false))
  };

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
          <div display='flex' justify-content='center' align-items='center'>
            <img src={userInfo.image} width='auto' height='200px'></img>
            <p display='flex' justify-content='center' align-items='center'>{userInfo.username}</p>
            <form action="/profile/uploadPhoto" method='post' enctype="multipart/form-data">
              <input type='file' id='image' name='image' />
              <input type='submit' />
            </form>
            <h3>Saved Recipes</h3>
            <ScrollBarSavedRecipes id={userInfo.savedRecipes} />
            <h3>Allergies</h3>
            <h4>{userInfo.allergies}</h4>
            <DropDown />
            <h3>Dietary Restrictions</h3>
            <h4>{userInfo.restrictions}</h4>
            <h3>Uploaded Recipes</h3>
            <ul>
              {userInfo.uploadedRecipes.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </StyledDiv>
      </StyledContainer>
    )
  }
};

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