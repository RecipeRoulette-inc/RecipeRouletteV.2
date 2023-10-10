import styled from 'styled-components';

const FlipCard = () => {

  return (
    <Wrapper>
      <Card>
        <Front></Front>
        <Back>
          <h1>Back of Card</h1>
          <p>Additional info on the back of the card</p>
        </Back>
      </Card>
    </Wrapper>
  )
};

const Wrapper = styled.div`
width: 350px; 
height: 500px; 
perspective: 800px; 
`;

const Card = styled.div`
height: 100%;
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
border-radius: 2rem; 
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
background-image: url(https://source.unsplash.com/random/350X500);
position: absolute;
backface-visibility:hidden;
`;

const Back = styled.div`
height: 100%;
width:100%;
border-radius: 2rem; 
box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25); 
position:absolute;
backface-visibility:hidden;
transform: rotateY(180deg);
background-color: grey;
display:flex;
flex-direction: column;
justify-content: center; 
align-items:center;
gap: 5rem;
`;

export default FlipCard; 