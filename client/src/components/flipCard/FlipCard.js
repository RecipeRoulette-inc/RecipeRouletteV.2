import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { save } from '../../../slices/flipCardSlice'
import { saveRecipe, removeRecipe } from '../../../slices/savedRecipesSlice'
import { Link } from 'react-router-dom';
import { getRecipeInformationBulk } from '../singleRecipePage/SingleRecipePage';

const FlipCard = ({ recipeInfo }) => {
  const { savedRecipes } = useSelector((state) => state.savedRecipes);
  const { saved } = useSelector((state) => state.flipCard);
  const dispatch = useDispatch();

  const { id, title, image, servings, readyInMinutes } = recipeInfo;
  // console.log('-------> RECIPE INFO: ', recipeInfo);
  // console.log('-------> ID: ', id);
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

  function handleSaveRecipe(e) {
    e.preventDefault();

    // JC: Save recipe if not saved.
    if (saved === false) {
      dispatch(save());
      dispatch(saveRecipe(testRecipe))
    }
    // JC: Remove recipe if saved.
    else {
      // ----CURRENTLY TESTING JUST SAVE----
      // dispatch(unsave());
      // dispatch(removeRecipe(index));
      // savedRecipes.slice(index, 1);
    }

    const reqOptions = {
      method: 'PATCH',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(savedRecipes)
        // Only want an individual recipe before sending
    };

    fetch('http://localhost:3000/recipes/updateSavedRecipes', reqOptions)
      // .then((res) => {
      //   if (res.status === 200) {
          
      //   }
      // })
      .catch((err) => {throw new Error(err);});
  }

  function handleSingleRecipeRoute(e) {
    e.preventDefault();

    const reqOptions = {
      method: 'GET',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(id)
    };

    // NEED URL HERE:
    fetch('http://localhost:3000/recipes/PROPPERPATH', reqOptions)
      .catch((err) => {throw new Error(err);});
  }

  function handlePassID() {

  }

  return (
    <Wrapper>

      <Card>
        <Front bg={image}>
        </Front>

        <Back>
          <center>
            <h1>Ready In: {readyInMinutes} minutes</h1>
            <h2>Servings: {servings}</h2>
            <br></br>

            {/* <button onClick={getRecipeInformationBulk(id)}>LOADER TEST</button> */}
            <Link to={'/' + id} >SEND ID</Link>
            {/* <h2><Link to='NEED PATH HERE'><button oncli>More Info</button></Link></h2> */}
            
          </center>
        </Back>

      </Card>
      <br></br>

      <FrontHeader>
        <h3>{title}</h3>
        <SaveButton onClick={(e)=>handleSaveRecipe(e)}>SAVE</SaveButton>
      </FrontHeader>

    </Wrapper>
  )
};

// height before: 500px
const Wrapper = styled.div`
width: 320px; 
height: 360px; 
perspective: 800px; 
`;

// adjusted height and moved Card to 'top' of the wrapper to make room for save button and info
const Card = styled.div`
height: 300px;
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
border-radius: 1rem; 
border-style: solid;
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
background-image: url(${(props) => props.bg});
background-repeat: no-repeat;
background-size: cover;
position: absolute;
backface-visibility:hidden;
`;



const Back = styled.div`
height: 100%;
width:100%;
border-radius: 1rem; 
border-style: solid;
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
position:absolute;
backface-visibility:hidden;
transform: rotateY(180deg);
background-color: #EE6352;
display:flex;
flex-direction: column;
justify-content: center; 
align-items:center;
gap: 5rem;
`;


//background-color: rgb(252,252,255);
const FrontHeader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-shadow: 1px 1px #F3F3F3;
h3 {
  text-align: center;
}
`;

const SaveButton = styled.button`
background: black;
color: white;
border-radius: 1rem;
width: 60px;
padding: 4px;
`


export default FlipCard; 