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


function exComponent() {


  return (
    <label>dairyFree:</label>
    <label>glutenFree:</label>
  );
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


// Random recipe query result:
{
  "recipes":[
    {
      "vegetarian":true,
      "vegan":false,"glutenFree":true,
      "dairyFree":false,
      "veryHealthy":false,
      "cheap":false,
      "veryPopular":false,
      "sustainable":false,
      "lowFodmap":false,
      "weightWatcherSmartPoints":14,
      "gaps":"no",
      "preparationMinutes":-1,
      "cookingMinutes":-1,
      "aggregateLikes":11,
      "healthScore":12,
      "creditsText":"Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      "license":"CC BY 3.0",
      "sourceName":"Foodista",
      "pricePerServing":489.23,
      "extendedIngredients":[
        {
          "id":10220444,"aisle":"Pasta and Rice",
          "image":"rice-white-long-grain-or-basmatii-cooked.jpg",
          "consistency":"SOLID",
          "name":"rice",
          "nameClean":"long grain rice",
          "original":"1 cup rice (I used long grain rice)",
          "originalName":"rice (I used long grain rice)",
          "amount":1.0,"unit":"cup",
          "meta":["long grain","(I used rice)"],
          "measures":{
            "us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},
            "metric":{"amount":185.0,"unitShort":"g","unitLong":"grams"}}
          },
          {"id":10220444,
          "aisle":"Pasta and Rice",
          "image":"uncooked-white-rice.png",
          "consistency":"SOLID","name":"rice",
          "nameClean":"long grain rice",
          "original":"1 cup rice (I used long grain rice)",
          "originalName":"rice (I used long grain rice)",
          "amount":1.0,"unit":"cup","meta":["long grain","(I used rice)"],
          "measures":{
            "us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},
            "metric":{"amount":185.0,"unitShort":"g","unitLong":"grams"}}
          },
          {
            "id":1011077,
            "aisle":"Milk, Eggs, Other Dairy",
            "image":"milk.png",
            "consistency":"LIQUID",
            "name":"milk",
            "nameClean":"whole milk",
            "original":"4 cups whole milk",
            "originalName":"whole milk",
            "amount":4.0,"unit":"cups",
            "meta":["whole"],
            "measures":{"us":{"amount":4.0,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":976.0,"unitShort":"ml","unitLong":"milliliters"}}},{"id":14355,"aisle":"Tea and Coffee","image":"tea-bags.jpg","consistency":"SOLID","name":"freshly tea","nameClean":"tea","original":"1 cup freshly brewed tea (I used Twinings English Breakfast and left the tea left to brew for five minutes)","originalName":"freshly brewed tea (I used Twinings English Breakfast and left the tea left to brew fminutes)","amount":1.0,"unit":"cup","meta":["english","brewed","(I used Twinings Breakfast and left the tea left to brew fminutes)"],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.0,"unitShort":"ml","unitLong":"milliliters"}}},{"id":1012010,"aisle":"Spices and Seasonings","image":"cinnamon.jpg","consistency":"SOLID","name":"cinnamon powder","nameClean":"ground cinnamon","original":"1 teaspoon cinnamon powder","originalName":"cinnamon powder","amount":1.0,"unit":"teaspoon","meta":[],"measures":{"us":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"},"metric":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"}}},{"id":2021,"aisle":"Spices and Seasonings","image":"ginger.png","consistency":"SOLID","name":"ginger powder","nameClean":"ginger powder","original":"1 teaspoon ginger powder","originalName":"ginger powder","amount":1.0,"unit":"teaspoon","meta":[],"measures":{"us":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"},"metric":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"}}},{"id":11300,"aisle":"Produce","image":"snow-peas.jpg","consistency":"SOLID","name":"cardomon pods","nameClean":"snow peas","original":"3 whole cardomon pods","originalName":"whole cardomon pods","amount":3.0,"unit":"","meta":["whole"],"measures":{"us":{"amount":3.0,"unitShort":"","unitLong":""},"metric":{"amount":3.0,"unitShort":"","unitLong":""}}},{"id":1012002,"aisle":"Spices and Seasonings","image":"star-anise.jpg","consistency":"SOLID","name":"star anise","nameClean":"star anise","original":"1 whole star anise","originalName":"whole star anise","amount":1.0,"unit":"","meta":["whole"],"measures":{"us":{"amount":1.0,"unitShort":"","unitLong":""},"metric":{"amount":1.0,"unitShort":"","unitLong":""}}},{"id":1002011,"aisle":"Spices and Seasonings","image":"cloves.jpg","consistency":"SOLID","name":"large cloves","nameClean":"clove","original":"6 large cloves","originalName":"","amount":6.0,"unit":"","meta":[],"measures":{"us":{"amount":6.0,"unitShort":"","unitLong":""},"metric":{"amount":6.0,"unitShort":"","unitLong":""}}},{"id":1012050,"aisle":"Baking","image":"vanilla-extract.jpg","consistency":"LIQUID","name":"vanilla essence","nameClean":"artificial vanilla","original":"1 teaspoon vanilla essence (or 1 vanilla bean)","originalName":"vanilla essence (or 1 vanilla bean)","amount":1.0,"unit":"teaspoon","meta":["(or 1 vanilla bean)"],"measures":{"us":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"},"metric":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"}}},{"id":19334,"aisle":"Baking","image":"light-brown-sugar.jpg","consistency":"SOLID","name":"brown sugar","nameClean":"golden brown sugar","original":"1/4 cup brown sugar","originalName":"brown sugar","amount":0.25,"unit":"cup","meta":[],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":55.0,"unitShort":"g","unitLong":"grams"}}},{"id":19334,"aisle":"Baking","image":"dark-brown-sugar.png","consistency":"SOLID","name":"brown sugar","nameClean":"golden brown sugar","original":"1/4 cup brown sugar","originalName":"brown sugar","amount":0.25,"unit":"cup","meta":[],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":55.0,"unitShort":"g","unitLong":"grams"}}}],
          
      ],
            
      "id":641644,
      "title":"Dreamy Chai Rice Pudding",
      "readyInMinutes":45,
      "servings":4,
      "sourceUrl":"https://www.foodista.com/recipe/CHRFL534/dreamy-chai-rice-pudding",
      "image":"https://spoonacular.com/recipeImages/641644-556x370.jpg",
      "imageType":"jpg",
      "summary":"Dreamy Chai Rice Pudding might be a good recipe to expand your dessert recipe box. One serving contains <b>376 calories</b>, <b>11g of protein</b>, and <b>8g of fat</b>. This gluten free and lacto ovo vegetarian recipe serves 4 and costs <b>$4.89 per serving</b>. 11 person have made this recipe and would make it again. This recipe from Foodista requires brown sugar, vanillan essence, cardomon pods, and star anise. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 57%</b>, which is solid. Similar recipes include <a href=\"https://spoonacular.com/recipes/chai-rice-pudding-250814\">Chai Rice Pudding</a>, <a href=\"https://spoonacular.com/recipes/chai-rice-pudding-760284\">Chai Rice Pudding</a>, and <a href=\"https://spoonacular.com/recipes/vanilla-and-chai-rice-pudding-546678\">Vanillan and Chai rice pudding</a>.",
      "cuisines":[],
      "dishTypes":["dessert"],
      "diets":[
        "gluten free",
        "lacto ovo vegetarian"
      ],
      "occasions":[],
      "instructions":"METHOD\nPut milk, tea, rice and all spices in a small saucepan and bring to boil. The turn down and simmer for around 20 minutes, stirring occasionally.\nAdd sugar and turn heat back up to high. Cook for three to four minutes, stirring all the time as the pudding thickens.\nServe in individual bowls. If you wish, you can pick out the spices before serving (use a spoon as the pudding will be very hot) but I figure most people can cope with minor details like that.",
      "analyzedInstructions":[
        {
          "name":"",
          "steps":[
            {
              "number":1,
              "step":"Put milk, tea, rice and all spices in a small saucepan and bring to boil. The turn down and simmer for around 20 minutes, stirring occasionally.",
              "ingredients":[
                {
                  "id":2035,"name":"spices",
                  "localizedName":"spices",
                  "image":"spices.png"
                },
                {
                  "id":1077,
                  "name":"milk",
                  "localizedName":"milk",
                  "image":"milk.png"
                },{"id":20444,"name":"rice","localizedName":"rice","image":"uncooked-white-rice.png"},{"id":14355,"name":"tea","localizedName":"tea","image":"tea-bags.jpg"}
              ],
              "equipment":[
                {"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"}
              ],
              "length":{"number":20,"unit":"minutes"}
            },
            {
              "number":2,
              "step":"Add sugar and turn heat back up to high. Cook for three to four minutes, stirring all the time as the pudding thickens.",
              "ingredients":[
                {
                  "id":19335,
                  "name":"sugar",
                  "localizedName":"sugar",
                  "image":"sugar-in-bowl.png"
                }
              ],
              "equipment":[]
              ,"length":{"number":3,"unit":"minutes"}
            },
            {
              "number":3,
              "step":"Serve in individual bowls. If you wish, you can pick out the spices before serving (use a spoon as the pudding will be very hot) but I figure most people can cope with minor details like that.",
              "ingredients":[{"id":2035,"name":"spices","localizedName":"spices","image":"spices.png"}],
              "equipment":[{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"}]
            }
          ]
        }
      ],
      "originalId":null,
      "spoonacularSourceUrl":"https://spoonacular.com/dreamy-chai-rice-pudding-641644"
    }
  ]
}