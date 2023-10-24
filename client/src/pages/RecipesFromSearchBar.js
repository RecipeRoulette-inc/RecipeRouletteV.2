import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { populateMain, clearMain, queryMade } from '../../slices/queryRecipesSlice';
import FlipCard from '../components/flipCard/FlipCard';
import  styled  from 'styled-components';


const Test = () => {
  const dispatch = useDispatch();
  const hello = useSelector((state) => state.queryRecipes)
  console.log(hello)
 

  const mapped = hello.queryRecipes.map((recipe) => (
    <Wrapper>
    <Card>
    {recipe.title}
    </Card>
   </Wrapper>
 
  ));



  return (
  <bgContainer>
    {mapped}
  </bgContainer>
  )
};


const bgContainer = styled.div`
display: grid;
grid-template-column: repeat(3, 1fr);
grid-template-row: repeat(3,1fr);
`
// height before: 500px
const Wrapper = styled.div`
width: 320px; 
height: 380px; 
perspective: 2000px; 
background-color: white;
border: 1px black 
`;

// adjusted height and moved Card to 'top' of the wrapper to make room for save button and info
const Card = styled.div`
height: 270px;
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

export default Test;

