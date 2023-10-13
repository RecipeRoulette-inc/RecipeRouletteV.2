import styled from 'styled-components';
import SearchBar from '../components/searchBar/SearchBar';
import ScrollBarRandom from '../components/scrollBar/ScrollBarRandom';

  
const HomePage = () => {

  const onSubmit = (data) => {
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          console.log('res not ok')
        }
        
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
    })
  }

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
        <LeftSection />
        <RightSection/>
      </DailyRecipe>
      <ScrollBarRandom />
    </Wrapper>
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
display: flex; 
flex-direction: row;
height: 400px; 
width: 100%;
border: 1px solid black;
`;

const LeftSection = styled.div``;

const RightSection = styled.div``;



export default HomePage;