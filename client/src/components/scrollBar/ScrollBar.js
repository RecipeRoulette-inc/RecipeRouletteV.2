import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

const ScrollBar = () => {

  const Cards = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => <FlipCard id={letter} key={letter}/>)

  return (
    <Wrapper>
      {Cards}
    </Wrapper>
)
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
gap: 1rem; 
flex-wrap:nowrap;
overflow:hidden;
overflow-x: auto;
padding: 1.5rem 1.5rem;

div {
  flex: 0 0 350px;
}
`;


export default ScrollBar; 