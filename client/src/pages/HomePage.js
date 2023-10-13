// libraries
import styled from 'styled-components';
import { useLoaderData, Link } from 'react-router-dom';

// components
import SearchBar from '../components/searchBar/SearchBar';
import ScrollBarRandom from '../components/scrollBar/ScrollBarRandom';
import ScrollBarUnder30 from '../components/scrollBar/ScrollBarUnder30';
import ScrollBarVegan from '../components/scrollBar/ScrollBarVegan';
import ScrollBarGlutenFree from '../components/scrollBar/ScrollBarGlutenFree';
  
const HomePage = () => {

  const handleGetRandomRecipe = () => {

    fetch('http://localhost:3000/recipes', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ error }) => {
            // create an Error object from error property or response statusText
            throw new Error(error|| res.statusText)
          })
        }
        
        return res.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error); 
      })
  }; 


  return (
    <Wrapper>
      {/* <SearchBar onSubmit={onSubmit} /> */}
      <DailyRecipe>
      </DailyRecipe>
      <ScrollBarRandom />
      <ScrollBarUnder30 />
      <ScrollBarVegan />
      <ScrollBarGlutenFree />
    </Wrapper>
  //  {
  //   careers.map(career => (
  //     <Link to='/' key={career.id}>
  //       <p>{career.title}</p>
  //       <p>{careeer.location}</p>
  //     </Link>
  //   ))
  // }

  )
};

//loader function
export const bulkRecipesLoader = async () => {
  console.log('bulkRecipesLoader')
  const res = await fetch('http://localhost:3000/recipes/randomRecipe'); 
  console.log('Response Received')
  const recipe = await res.json()
  console.log(recipe);
  return [recipe];
}

const Wrapper = styled.div`
`;

const DailyRecipe = styled.div`
height: 400px; 
width: 100%;
border: 1px solid black;
background:red;
`;




export default HomePage;