import styled from 'styled-components';
import SearchBar from '../components/searchBar/SearchBar';
import ScrollBar from '../components/scrollBar/ScrollBar';
import { useLoaderData, Link } from 'react-router-dom';

  
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
// when we click on link of route associated with loader...data is fetched
export const careersloader = async () => {
  // make a request to the API endpoint to get recipe data
  const res = await fetch('');

  // this is a promise, this promise will be resolved by react router
  return res.json(); 
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