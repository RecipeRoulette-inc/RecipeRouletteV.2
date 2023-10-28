const SpoonacularApi = require('spoonacular_api');

const defaultClient = SpoonacularApi.ApiClient.instance;

const apiKeyScheme = defaultClient.authentications['apiKeyScheme']; 
apiKeyScheme.apiKey = process.env.API_KEY
console.log(apiKeyScheme)
console.log(process.env.API_KEY)
const apiInstance = new SpoonacularApi.RecipesApi();
const fs = require('fs')
const path = require('path')
const pool = require('../database/connectToDb');
// JC Imports: To save recipe and update existing userDoc. Can move import and method to userController if more appropriate
const User = require('../models/userModel');

// Helper Function to Deconstruct Api response for Frontend, adjust allowed filters for additional props
const deconstruct = (data) => {
  const newData = [];
for (const recipe of data){
  const allowed = ['id', 'title', 'image', 'readyInMinutes', 'dairyFree', 'glutenFree', 'vegan', 'vegetarian', 'diets']
  const cleanRecipe = {};

  for (let key in recipe){
      if(allowed.includes(key)){
          cleanRecipe[key] = recipe[key]
      }
  }
  newData.push(cleanRecipe)
}
return newData
}

// opts for Testing purposes, individual opts created per search
// let opts = {
//   'query': 'chicken',
//   'cuisine': 'indian',
//   'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
//   'addRecipeNutrition': true, // Boolean | If set to true, you get more information about the recipes returned.
//   'includeNutrition': true,
//   'addRecipeInformation': true, 
//   'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
//   'intolerances': 'gluten', // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
//   'number': 75 // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
// };

const PATH_TO_DB = path.resolve(__dirname, '../../data/homepage.json');
const recipeController = {}; 

// recipeController.getRecipeInformationBulk = (req, res, next) => {
//   console.log('getRandomRecipe Controller'); 
// };

recipeController.getRandomRecipe = (req, res, next) => {
  console.log('-------> getRandomRecipe Controller');
  let opts = {
  'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
  'addRecipeNutrition': true, // Boolean | If set to true, you get more information about the recipes returned.
  'includeNutrition': true,
  'addRecipeInformation': true, 
  'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
  'number': 10
  }

  apiInstance.getRandomRecipes(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      // console.log('API called successfully. Returned data: ' + console.log(JSON.stringify(data, null, 2)))
      res.locals.randomRecipe = JSON.stringify(data);
      return next()
    }
  });

} 

recipeController.searchRecipes = (req, res, next) => {
  // console.log('from searchRecipes')
  // console.log('Search Query NOW ------------>>', req.body)
  const {opts: data} = req.body;
  // console.log('this is the req.params', req.params)
  // console.log(req.body)

  let opts = {
    'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
    'addRecipeNutrition': true, // Boolean | If set to true, you get more information about the recipes returned.
    'includeNutrition': true,
    'number': 10
  }
  // initialize a query prop in opts
  // console.log('OPTS w. QUERY AFTER', opts)
  opts.query = req.body.query 
  // add search to opts
  for (let key in req.body.opts){
    if(!opts[key]) opts[key] = req.body.opts[key].toString()
}

// console.log('OPTS w. QUERY AFTER', opts)
  // remember that we changed 'opts' to 'data'
  apiInstance.searchRecipes(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      let ids = data.results.map((e)=> e.id).toString()
      // console.log('test ids ---------', ids)
      // console.log('<<<<<<<<<<<<< PRE second Api Call >>>>>>>>>>>>>>>>>>>>>>')

      apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
         res.locals.recipes = deconstruct(data)
         return next()
        }
      });
    }
  });
  // Inner Api Query based on IDs of first query?
  // The second part of this route has NOT been tested
  // Be mindful that these will result in two requests each time... or more
  // apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('API called successfully. Returned data: ' + data);
  //   }
  // });

} 

// If we decide to make a separate page, we will need this controller for additional calls
// Otherwise this can be included in the earlier call nested
recipeController.getRecipeInformationBulk = (req, res, next) => {

  // let ids = req.body.id
  // console.log('-------> from getRecipeInformationBulk');
  // console.log('REQ.PARAMS: ', req.params);
  let ids = req.params.id;
  console.log('this is the ids',ids)
  const opts = {
    'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
  'addRecipeNutrition': true, // Boolean | If set to true, you get more information about the recipes returned.
  'includeNutrition': true,
  'addRecipeInformation': true, 
  'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
  'number': 1
  };
  
  apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      res.locals.getRecipeInfo = data; 
      return next()
    }
  });

} 

// JC New Code: Update savedRecipes property on userDoc
recipeController.updateSavedRecipes = async (req, res, next) => {

  try {
    const saveNewRecipe = req.body;
    
    // JC: Example variable from cookies to query DB for this specific user. 
    const { id } = res.locals.user;
    console.log(id)
    console.log("PRE FIND BY ID")

    const userDoc = await User.findByIdAndUpdate({ _id: id },
      {
      $push: {
        savedRecipes: saveNewRecipe,
      },
    },);
    return next();
  }
  catch(err) {
    return next({
      log: 'Error occured in recipeController.updateSavedRecipes',
      status: 400,
      message: { err: `recipeController.updateSavedRecipes: ${err}` }
    });
  }
}

recipeController.getRecipeNutritionLabel = (req, res, next) => {
  try {
  //console.log('-------> getRecipeNutritionLabel Controller');
  let id = req.params.recipeId; // Number | The recipe id.
  let opts = {
    'showOptionalNutrients': false, // Boolean | Whether to show optional nutrients.
    'showZeroValues': false, // Boolean | Whether to show zero values.
    'showIngredients': false // Boolean | Whether to show a list of ingredients.
  };

  apiInstance.recipeNutritionLabelImage(id, opts, (error, data, response) => {
    if (error) {
      //console.error(error);
      return next({
        log: 'Error occured in recipeController.getRecipeNutritionLabel',
        status: 404,
        message: { err: `recipeController.getRecipeNutritionLabel null data: ${error}` }
      });
    } else {
      res.locals.nutritionLabel = data;
      return next()
    }
  });
}
catch (error) {
  return next({
    log: 'Error occured in recipeController.getRecipeNutritionLabel',
    status: 400,
    message: { err: `recipeController.getRecipeNutritionLabel: ${err}` }
  });
}
} 

recipeController.searchByIngredient = async (req, res, next) => {


  try {
    //nb : ingredients should be a string of ingredients separated by commas
    //e.g. : apples,flour,sugar,milk
    //stored on request.body.ingredients

    const opts = {
    'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
    'includeNutrition': true,
    'addRecipeInformation': true, 
    'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
    'number': 3,
    'ignorePantry': true,
    'ingredients' : req.body.ingredients
    };
    
    console.log(opts.ingredients)
    apiInstance.searchRecipesByIngredients(opts, (error, data, response) => {
      if (error) {
        console.log(error)
        return next(error)
      }
      else {
        res.locals.searchResults = data;
        return next()
      }
    })
    
  } catch (error) {
    //console.log(error)
    return next({
      log: "Error searching by ingredient",
      status: 400,
      message: { error: "Error in searchByIngredient" },
  })
  }
}

recipeController.updateHomepageCache = async (req, res, next) => {
//if user has no preferences, do this.
//else, fetch homepage content
try {
  console.log('WE IN THE CACHED TIMELINE')
  if (res.locals.allergies == undefined) {
let currentDB = fs.readFileSync(PATH_TO_DB, 'utf-8')
const currentDBParsed = (JSON.parse(currentDB))
if (new Date() > currentDBParsed.expiresAt) {
  console.log('new cache')
  newDBParsed = updateHomepage()
  res.locals.json = newDBParsed
}
else {
  console.log('old cache')
  res.locals.json = currentDB
}

  return next()
}
else {
  //manual search time qq
  console.log('MANUAL SEARCH TIME BABY')
  const homepage = {}
  homepage.vegans = await manualSearch({diet:'vegan', allergies: res.locals.allergies})
  homepage.underThirty = await manualSearch({readyTime: '30', allergies: res.locals.allergies})
  homepage.randoms = await getRandoms()
  homepageJSON = JSON.stringify(homepage)
  res.locals.json = homepageJSON;
  return next()
}
}
catch (err) {
  return next({
    log: 'Error occured in recipeController.updateHomepageCache',
    status: 400,
    message: { err: `recipeController.updateHomepageCache: ${err}` }
  });
}
}

recipeController.getAllergies = async (req, res, next) => {

  try {
    console.log('getAllergies')
    const user_id = res.locals.user_id;

    const text = 'SELECT allergies FROM user_preferences WHERE user_id =$1;';

    pool.query(text, [user_id])
      .then((data) => {
        res.locals.allergies = data.rows[0].allergies 
            

      })
      .then((data) => console.log('res.locals', res.locals.userInfo))
      .then(() => next())
      .catch((err) => {
        console.log('An error occurred in the getUserInfo middleware.')
        return next((err) => err = {
            log: 'An error occurred in the getUserInfo middleware.'
        })
    })
  } catch (error) {
    console.log('wah!')
    console.log(error)
  }
}

getVegans = () => {
  return new Promise((resolve, reject) => {
    const opts = {
      instructionsRequired: true,
      addRecipeNutrition: true,
      includeNutrition: true,
      number: 10,
      query: undefined,
      diet: 'vegan',
      sort: 'random'
    };

    apiInstance.searchRecipes(opts, (error, data, response) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        const ids = data.results.map((e) => e.id).toString();

        apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log('cached homepage successfully fetched vegans');
            resolve(deconstruct(data));
          }
        });
      }
    });
  });
};
getUnder30s = () => {
  return new Promise((resolve, reject) => {
    const opts = {
      instructionsRequired: true,
      addRecipeNutrition: true,
      includeNutrition: true,
      number: 10,
      query: undefined,
      maxReadyTime: '30',
      sort: 'random'
    };

    apiInstance.searchRecipes(opts, (error, data, response) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        const ids = data.results.map((e) => e.id).toString();

        apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log('cached homepage successfully fetched under 30s');
            resolve(deconstruct(data));
          }
        });
      }
    });
  });
};

getRandoms = () => {
  return new Promise((resolve, reject) => {
    const opts = {
      instructionsRequired: true,
      addRecipeNutrition: true,
      includeNutrition: true,
      number: 10
    };

    apiInstance.getRandomRecipes(opts, (error, data, response) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log('cached homepage successfully fetched random');
        resolve(data);
      }
    });
  });
};


updateHomepage = async () => {
  const homepage = {}
  //get the randoms...

 
homepage.randoms = await getRandoms()

homepage.underThirty = await getUnder30s();

homepage.vegans = await getVegans();

const currentDate = new Date();

// Add 1 hour to the current date and time
const oneHourFromNow = new Date(currentDate);
oneHourFromNow.setHours(currentDate.getHours() + 1);

homepage.expiresAt = oneHourFromNow;
  console.log('homepage cached')
  console.log(homepage)
  homepageJSON = JSON.stringify(homepage)
  fs.writeFile(PATH_TO_DB, homepageJSON, err => {
    if (err) {
      console.log("error in updateHomePage write: " , err)
    }
  })
  return homepageJSON
}

manualSearch = async (options) => {
  return new Promise((resolve, reject) => {
    const opts = {
      instructionsRequired: true,
      addRecipeNutrition: true,
      includeNutrition: true,
      number: 10,
      query: undefined,
      maxReadyTime: '30',
      sort: 'random'
    };
    if (options.readyTime) {
      opts.maxReadyTime = options.readyTime;
    }
    if (options.diet) {
      opts.diet = options.diet
    }
    if (options.allergies) {
      opts.allergies = options.allergies
    }
    apiInstance.searchRecipes(opts, (error, data, response) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        const ids = data.results.map((e) => e.id).toString();

        apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log('cached homepage successfully fetched under 30s');
            resolve(deconstruct(data));
          }
        });
      }
    });
  });
}
module.exports = recipeController;