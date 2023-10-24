CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT (uuid_generate_v4()),
  username VARCHAR(200) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE user_preferences (
  user_pref_id UUID PRIMARY KEY,
  saved_recipes VARCHAR[],
  allergies VARCHAR[],
  dietary_restrictions VARCHAR[],
  user_id UUID,
  recipes_id UUID
);

CREATE TABLE uploaded_recipes (
  user_recipe_id UUID PRIMARY KEY,
  ingredients VARCHAR[],
  instructions VARCHAR[],
  diets VARCHAR[],
  country_origin VARCHAR,
  allergens VARCHAR[],
  image VARCHAR,
  user_id UUID
);

CREATE TABLE recipes (
  recipe_id UUID PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  created_at DATE NOT NULL
);

COMMENT ON COLUMN recipes.body IS 'Content of the post';

ALTER TABLE uploaded_recipes ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE user_preferences ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE user_preferences ADD FOREIGN KEY (recipes_id) REFERENCES recipes (recipe_id);
