// libraries
import styled from 'styled-components';
import { useLoaderData, Link } from 'react-router-dom';

// components
import SearchBar from '../components/searchBar/SearchBar';
import ScrollBar from '../components/scrollBar/ScrollBar';

  
const HomePage = () => {

  const careers = useLoaderData();


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
      <ScrollBar />
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
  console.log('recipesLoader')
  const res = await fetch('http://localhost:3000/test/test'); 
  console.log('Res Received')
  return res.json();
}

const Wrapper = styled.div`
`;

const DailyRecipe = styled.div`
height: 400px; 
width: 100%;
border: 1px solid black;
background:red;
`;

const LeftSection = styled.div`

`;

const RightSection = styled.div``;



export default HomePage;