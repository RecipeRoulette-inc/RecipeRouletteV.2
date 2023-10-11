import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RecipeCard from './components/recipeCard/index'
import FlipCard from './components/flipCard/FlipCard';
import AllergyPage from './pages/AllergySelection';
import SignupPage from './pages/SignupPage';



const recipes = [                                                                                     
    {                                                                                              
      "id": 800754,                                                                                
      "title": "Buttered Plantain Fries and Seasoned Avocado",                                     
      "image": "https://spoonacular.com/recipeImages/800754-556x370.jpg",                          
      "imageType": "jpg",                                                                          
      "servings": 3,                                                                               
      "readyInMinutes": 45,                                                                        
      "license": "CC BY 4.0",                                                                      
      "sourceName": "Afrolems",                                                                    
      "sourceUrl": "http://www.afrolems.com/2016/08/30/buttered-plantain-fries-seasoned-avocado-afrolems/",                                                                                            
      "spoonacularSourceUrl": "https://spoonacular.com/buttered-plantain-fries-and-seasoned-avocado-800754",                                                                                           
      "aggregateLikes": 6,                                                                         
      "healthScore": 4,                                                                            
      "pricePerServing": 117.39,                                                                   
      "cheap": false,                                                                              
      "creditsText": "Afrolems",                                                                   
      "dairyFree": false,                                                                          
      "gaps": "no",                                                                                
      "glutenFree": true,                                                                          
      "instructions": "Peel and Slice your plantain into thin stripes and set aside.In a pan, pour in your butter and oil and heat slowly.Toss in your plantain and allow to brown on all sides.Mash your avocado, season with salt and stir in your chopped pepper, garlic and onion.Serve as a starter.",                                                                                             
      "lowFodmap": false,                                                                          
      "sustainable": false,                                                                        
      "vegan": false,                                                                              
      "vegetarian": true,                                                                          
      "veryHealthy": false,                                                                        
      "veryPopular": false,                                                                        
      "weightWatcherSmartPoints": 20,                                                              
      "summary": `Buttered Plantain Fries and Seasoned Avocado is an American side dish. For $1.17 per serving, this recipe covers 13% of your daily requirements of vitamins and minerals. Watching your figure? This gluten free and lacto ovo vegetarian recipe has 555 calories,
 >3g of protein, and 50g of fat per serving. This recipe serves 3. 6 people have tried and
 liked this recipe. If you have avocado, butter, onions to garnish, and a few other ingredients on h
 and, you can make it. From preparation to the plate, this recipe takes around 45 minutes. It
 is brought to you by Afrolems. All things considered, we decided this recipe deserves a spoonacul
 ar score of 36%. This score is not so outstanding. Try
 /seasoned-fries-402743\">Seasoned Fries,
 -fries-499990\">Seasoned Oven Fries, and
 to-fries-115792\">Seasoned Potato Fries for similar recipes.`,                                 
      "analyzedInstructions": [                                                                    
        {                                                                                          
          "name": "",                                                                              
          "steps": [                                                                               
            {                                                                                      
              "number": 1,                                                                         
              "step": `Peel and Slice your plantain into thin stripes and set aside.In a pan, pour i
 n your butter and oil and heat slowly.Toss in your plantain and allow to brown on all sides.Mash you
 r avocado, season with salt and stir in your chopped pepper, garlic and onion.`,                   
              "ingredients": [                                                                     
                {                                                                                  
                  "id": 99295,                                                                     
                  "name": "plantain",                                                              
                  "localizedName": "plantain",                                                     
                  "image": "plantains.jpg"                                                         
                },                                                                                 
                {                                                                                  
                  "id": 9037,                                                                      
                  "name": "avocado",                                                               
                  "localizedName": "avocado",                                                      
                  "image": "avocado.jpg"                                                           
                },                                                                                 
                {                                                                                  
                  "id": 1001,                                                                      
                  "name": "butter",                                                                
                  "localizedName": "butter",                                                       
                  "image": "butter-sliced.jpg"                                                     
                },                                                                                 
                {                                                                                  
                  "id": 11215,                                                                     
                  "name": "garlic",                                                                
                  "localizedName": "garlic",                                                       
                  "image": "garlic.png"                                                            
                },                                                                                 
                {                                                                                  
                  "id": 1002030,                                                                   
                  "name": "pepper",                                                                
                  "localizedName": "pepper",                                                       
                  "image": "pepper.jpg"                                                            
                },                                                                                 
                {                                                                                  
                  "id": 11282,                                                                     
                  "name": "onion",                                                                 
                  "localizedName": "onion",                                                        
                  "image": "brown-onion.png"                                                       
                },                                                                                 
                {                                                                                  
                  "id": 2047,                                                                      
                  "name": "salt",                                                                  
                  "localizedName": "salt",                                                         
                  "image": "salt.jpg"                                                              
                },                                                                                 
                {                                                                                  
                  "id": 4582,                                                                      
                  "name": "cooking oil",                                                           
                  "localizedName": "cooking oil",                                                  
                  "image": "vegetable-oil.jpg"                                                     
                }                                                                                  
              ],                                                                                   
              "equipment": [                                                                       
                {                                                                                  
                  "id": 404645,                                                                    
                  "name": "frying pan",                                                            
                  "localizedName": "frying pan",                                                   
                  "image": "pan.png"                                                               
                }                                                                                  
              ]                                                                                    
            },                                                                                     
            {                                                                                      
              "number": 2,                                                                         
              "step": "Serve as a starter.",                                                       
              "ingredients": [],                                                                   
              "equipment": []                                                                      
            }                                                                                      
          ]                                                                                        
        }                                                                                          
      ],                                                                                           
      "cuisines": [                                                                                
        "American"                                                                                 
      ],                                                                                           
      "diets": [                                                                                   
        "gluten free",                                                                             
        "lacto ovo vegetarian"                                                                     
      ],                                                                                           
      "occasions": [],                                                                             
      "dishTypes": [                                                                               
        "side dish"                                                                                
      ],                                                                                           
      "extendedIngredients": [                                                                     
        {                                                                                          
          "aisle": "Produce",                                                                      
          "amount": 1,                                                                             
          "id": 9037,                                                                              
          "image": "avocado.jpg",                                                                  
          "name": "avocado",                                                                       
          "original": "1 Avocado",                                                                 
          "originalName": "Avocado",                                                               
          "unit": "",                                                                              
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 1,                                                                         
              "unitLong": "",                                                                      
              "unitShort": ""                                                                      
            },                                                                                     
            "us": {                                                                                
              "amount": 1,                                                                         
              "unitLong": "",                                                                      
              "unitShort": ""                                                                      
            }                                                                                      
          },                                                                                       
          "meta": []                                                                               
        },                                                                                         
        {                                                                                          
          "aisle": "Milk, Eggs, Other Dairy",                                                      
          "amount": 0.5,                                                                           
          "id": 1001,                                                                              
          "image": "butter-sliced.jpg",                                                            
          "name": "butter",                                                                        
          "original": "1/2 cup of melted butter",                                                  
          "originalName": "melted butter",                                                         
          "unit": "cup",                                                                           
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 113.5,                                                                     
              "unitLong": "grams",                                                                 
              "unitShort": "g"                                                                     
            },                                                                                     
            "us": {                                                                                
              "amount": 0.5,                                                                       
              "unitLong": "cups",                                                                  
              "unitShort": "cups"                                                                  
            }                                                                                      
          },                                                                                       
          "meta": [                                                                                
            "melted"                                                                               
          ]                                                                                        
        },                                                                                         
        {                                                                                          
          "aisle": "Produce",                                                                      
          "amount": 1,                                                                             
          "id": 11819,                                                                             
          "image": "red-chili.jpg",                                                                
          "name": "chili pepper",                                                                  
          "original": "A handful of chopped chili pepper",                                         
          "originalName": "chopped chili pepper",                                                  
          "unit": "handful",                                                                       
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 1,                                                                         
              "unitLong": "handful",                                                               
              "unitShort": "handful"                                                               
            },                                                                                     
            "us": {                                                                                
              "amount": 1,                                                                         
              "unitLong": "handful",                                                               
              "unitShort": "handful"                                                               
            }                                                                                      
          },                                                                                       
          "meta": [                                                                                
            "chopped"                                                                              
          ]                                                                                        
        },                                                                                         
        {                                                                                          
          "aisle": "Produce",                                                                      
          "amount": 1,                                                                             
          "id": 11215,                                                                             
          "image": "garlic.png",                                                                   
          "name": "garlic",                                                                        
          "original": "1 clove of garlic chopped",                                                 
          "originalName": "garlic chopped",                                                        
          "unit": "clove",                                                                         
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 1,                                                                         
              "unitLong": "clove",                                                                 
              "unitShort": "clove"                                                                 
            },                                                                                     
            "us": {                                                                                
              "amount": 1,                                                                         
              "unitLong": "clove",                                                                 
              "unitShort": "clove"                                                                 
            }                                                                                      
          },                                                                                       
          "meta": [                                                                                
            "chopped"                                                                              
          ]                                                                                        
        },                                                                                         
        {                                                                                          
          "aisle": "Produce",                                                                      
          "amount": 3,                                                                             
          "id": 11282,                                                                             
          "image": "brown-onion.png",                                                              
          "name": "onions to garnish",                                                             
          "original": "chopped Onions to garnish",                                                 
          "originalName": "chopped Onions to garnish",                                             
          "unit": "servings",                                                                      
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 3,                                                                         
              "unitLong": "servings",                                                              
              "unitShort": "servings"                                                              
            },                                                                                     
            "us": {                                                                                
              "amount": 3,                                                                         
              "unitLong": "servings",                                                              
              "unitShort": "servings"                                                              
            }                                                                                      
          },                                                                                       
          "meta": [                                                                                
            "chopped"                                                                              
          ]                                                                                        
        },                                                                                         
        {                                                                                          
          "aisle": "Produce",                                                                      
          "amount": 1,                                                                             
          "id": 99295,                                                                             
          "image": "plantains.jpg",                                                                
          "name": "plantain",                                                                      
          "original": "1 plantain",                                                                
          "originalName": "plantain",                                                              
          "unit": "",                                                                              
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 1,                                                                         
              "unitLong": "",                                                                      
              "unitShort": ""                                                                      
            },                                                                                     
            "us": {                                                                                
              "amount": 1,                                                                         
              "unitLong": "",                                                                      
              "unitShort": ""                                                                      
            }                                                                                      
          },                                                                                       
          "meta": []                                                                               
        },                                                                                         
        {                                                                                          
          "aisle": "Spices and Seasonings",                                                        
          "amount": 3,                                                                             
          "id": 2047,                                                                              
          "image": "salt.jpg",                                                                     
          "name": "salt",                                                                          
          "original": "salt",                                                                      
          "originalName": "salt",                                                                  
          "unit": "servings",                                                                      
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 3,                                                                         
              "unitLong": "servings",                                                              
              "unitShort": "servings"                                                              
            },                                                                                     
            "us": {                                                                                
              "amount": 3,                                                                         
              "unitLong": "servings",                                                              
              "unitShort": "servings"                                                              
            }                                                                                      
          },                                                                                       
          "meta": []                                                                               
        },                                                                                         
        {                                                                                          
          "aisle": "Oil, Vinegar, Salad Dressing",                                                 
          "amount": 2,                                                                             
          "id": 4669,                                                                              
          "image": "vegetable-oil.jpg",                                                            
          "name": "vegetable oil",                                                                 
          "original": "2 tablespoons of vegetable oil",                                            
          "originalName": "vegetable oil",                                                         
          "unit": "tablespoons",                                                                   
          "measures": {                                                                            
            "metric": {                                                                            
              "amount": 2,                                                                         
              "unitLong": "Tbsps",                                                                 
              "unitShort": "Tbsps"                                                                 
            },                                                                                     
            "us": {                                                                                
              "amount": 2,                                                                         
              "unitLong": "Tbsps",                                                                 
              "unitShort": "Tbsps"                                                                 
            }                                                                                      
          },                                                                                       
          "meta": []                                                                               
        }                                                                                          
      ]                                                                                            
    }                                                                                              
  ]                                                                                                
                                                          
 
 

const GlobalStyle = createGlobalStyle`
* {
    margin: 0; 
    padding:0; 
    box-sizing: border-box;
}

:root {
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
}

body {
  height: 100vh;  
}  
`;


const App = () => {
  return (
    <Screen>
      <GlobalStyle />

      {/* <LoginPage/> */}
      <HomePage />

    </Screen>
  )
};

const Screen = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin: auto;
padding: 100px;
`;

export default App;