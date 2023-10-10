import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newestRecipe: '',
  recipesTotal: 0,
  recipeList: []
};

// CAN TURN INTO CREATE YOUR OWN RECIPE SLICE
// all actions are generalized in terms of the payload, will have to refactor based on how the API presents the information
export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.newestRecipe = action.payload.name;
      state.recipeTotal += 1;
      state.recipeList.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipeTotal -= 1;
      state.recipeList.splice(action.payload.index, 1);
    }
  },
});

export const { addRecipe, removeRecipe } = apiSlice.actions;

export default apiSlice.reducer;




// 1: Type into search bar (types in 'pasta' for example), GET request is made, query result example:
{
  "results":[
    {
      "id":654959,
      "title":"Pasta With Tuna",
      "image":"https://spoonacular.com/recipeImages/654959-312x231.jpg",
      "imageType":"jpg"
    },
    {
      "id":511728,
      "title":"Pasta Margherita",
      "image":"https://spoonacular.com/recipeImages/511728-312x231.jpg",
      "imageType":"jpg"
    },
    {
      "id":654857,
      "title":"Pasta On The Border",
      "image":"https://spoonacular.com/recipeImages/654857-312x231.jpg",
      "imageType":"jpg"
    }
  ]
}

// 2: Choose one recipe, GET request is made for that recipe information, query result example:
{
  "id": 716429,
  "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
  "imageType": "jpg",
  "servings": 2,
  "readyInMinutes": 45,
  "sourceName": "Full Belly Sisters",
  "sourceUrl": "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
  "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
  "pricePerServing": 163.15,
  "dairyFree": false,
  "glutenFree": false,
  "ketogenic": false,
  "vegan": false,
  "vegetarian": false,
  "extendedIngredients": [
      {
          "id": 1001,
          "image": "butter-sliced.jpg",
          "measures": {
              "us": {
                  "amount": 1.0,
                  "unitLong": "Tbsp",
                  "unitShort": "Tbsp"
              }
          },
          "name": "butter",
          "original": "1 tbsp butter",
          "originalName": "butter",
          "unit": "tbsp"
      },
      {
          "id": 10011135,
          "image": "cauliflower.jpg",
          "measures": {
              "us": {
                  "amount": 2.0,
                  "unitLong": "cups",
                  "unitShort": "cups"
              }
          },
          "meta": [
              "frozen",
              "thawed",
              "cut into bite-sized pieces"
          ],
          "name": "cauliflower florets",
          "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
          "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
          "unit": "cups"
      },
      
  ]
}

// Cooking instructions:
[
  {
    "name":"",
    "steps":[
      {
        "number":1,
        "step":"Cook pasta in a large pot of boiling water until al dente.",
        "ingredients":[
          {"id":20420,"name":"pasta","localizedName":"pasta","image":"fusilli.jpg"},
          {"id":14412,"name":"water","localizedName":"water","image":"water.png"}
        ],
        "equipment":[
          {"id":404752,"name":"pot","localizedName":"pot","image":"stock-pot.jpg"}
        ]
      },
      {
        "number":2,
        "step":"Drain and return to warm pot. Put olive oil in saucepan and add onion.",
        "ingredients":[
          {"id":4053,"name":"olive oil","localizedName":"olive oil","image":"olive-oil.jpg"},
          {"id":11282,"name":"onion","localizedName":"onion","image":"brown-onion.png"}
        ],
        "equipment":[
          {"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"},
          {"id":404752,"name":"pot","localizedName":"pot","image":"stock-pot.jpg"}
        ]
      },
      {
        "number":3,
        "step":"Saute until transparent. Stir in flour and cook for a few seconds and then whisk in milk. Stir constantly until this thickens.",
        "ingredients":[
          {"id":20081,"name":"all purpose flour","localizedName":"all purpose flour","image":"flour.png"},
          {"id":1077,"name":"milk","localizedName":"milk","image":"milk.png"}
        ],
        "equipment":[
          {"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"}
        ]
      }
    ]
  }
]