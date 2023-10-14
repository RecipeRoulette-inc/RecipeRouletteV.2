import styled from 'styled-components';

const RecipeTime = ({time}) => {
  return <Time>{time}</Time>
}; 

const Time = styled.div`
position:absolute;
top: -20px; 
left: 0; 
`;

export default RecipeTime;