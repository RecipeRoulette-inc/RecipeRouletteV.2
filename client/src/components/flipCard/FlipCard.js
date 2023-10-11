import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addRecipe } from '../../../slices/queryInfo(useless)';

const FlipCard = () => {
  // JC: NOTE (Edwin): Need Index for each card to properly splice/remove them from the savedRecipes array
  const { savedRecipes } = useSelector((state) => state.savedRecipes);
  const { saved } = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  /** JC:
   * EXAMPLE PIECE OF STATE for each card from Redux would have to deconstruct from the query 
   *  based on these example properties.
   * NOTE: Keep in mind the state is actually an ARRAY. Would need to push this new recipe object into that array.
   *  Only then can you properly update the userDoc savedRecipes property and Redux state.
   */
  const testRecipe = {
    "vegetarian":true,
    "dairyFree":false,
    "preparationMinutes":-1,
    "cookingMinutes":-1,
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
        }
    ],
    "title":"Dreamy Chai Rice Pudding",
    "readyInMinutes":45,
    "servings":4,
    "sourceUrl":"https://www.foodista.com/recipe/CHRFL534/dreamy-chai-rice-pudding",
    "image":"https://spoonacular.com/recipeImages/641644-556x370.jpg",
    "imageType":"jpg",
    "summary":"Dreamy Chai Rice Pudding might be a good recipe to expand your dessert recipe box. One serving contains <b>376 calories</b>, <b>11g of protein</b>, and <b>8g of fat</b>. This gluten free and lacto ovo vegetarian recipe serves 4 and costs <b>$4.89 per serving</b>. 11 person have made this recipe and would make it again. This recipe from Foodista requires brown sugar, vanillan essence, cardomon pods, and star anise. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 57%</b>, which is solid. Similar recipes include <a href=\"https://spoonacular.com/recipes/chai-rice-pudding-250814\">Chai Rice Pudding</a>, <a href=\"https://spoonacular.com/recipes/chai-rice-pudding-760284\">Chai Rice Pudding</a>, and <a href=\"https://spoonacular.com/recipes/vanilla-and-chai-rice-pudding-546678\">Vanillan and Chai rice pudding</a>.",
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
    ]
  }

  function handleSaveRecipe() {
    e.preventDefault();

    // JC: Save recipe if not saved.
    if (!saved) {
      dispatch(save());
      dispatch(addRecipe(testRecipe))
      // JC: The same as addRecipe action in savedRecipesSlice, but this is for the fetch request.
      savedRecipes.push(testRecipe);
    }
    // JC: Remove recipe if saved.
    else {
      dispatch(unsave());
      dispatch(removeRecipe(index));
      savedRecipes.slice(index, 1);
    }

    /** JC:
     * The fetch request is just an example of the PATCH we'll be doing to send this data over
     * to the backend using whatever route to update the userDoc with the new favorited recipe
     */
    const reqOptions = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(savedRecipes)
    };

    // JC: Dummy URL:
    fetch('http://localhost:3000/saveRecipeTest', reqOptions)
      .catch((err) => {throw new Error(err);});
  }


  return (
    <Wrapper>
        <div>
          <button onClick={handleSaveRecipe}>SAVE</button>
        </div>
      <Card>
        <Front></Front>
        <Back>
          <h1>Back of Card</h1>
          <p>Additional info on the back of the card</p>
        </Back>
      </Card>
    </Wrapper>
  )
};

const Wrapper = styled.div`
width: 350px; 
height: 500px; 
perspective: 800px; 
`;

const Card = styled.div`
height: 100%;
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
border-radius: 2rem; 
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
background-image: url(https://source.unsplash.com/random/350X500);
position: absolute;
backface-visibility:hidden;
`;

const Back = styled.div`
height: 100%;
width:100%;
border-radius: 2rem; 
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
position:absolute;
backface-visibility:hidden;
transform: rotateY(180deg);
background-color: grey;
display:flex;
flex-direction: column;
justify-content: center; 
align-items:center;
gap: 5rem;
`;

export default FlipCard; 