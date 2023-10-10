import styled, {keyframes} from "styled-components";

const Allergy = ({ allergen }) => {
  
  const randomTop = `${Math.random() * 100}%`; 
  const randomLeft = `${Math.random() * 100}%`; 

  return (
    <Wrapper style={{top: randomTop, left: randomLeft}}>
      {allergen}
    </Wrapper>
  )
};

const floatAnimation = keyframes`
0%   { transform: translate(-50%, -50%) translateY(0px); }
50%  { transform: translate(-50%, -50%) translateY(-20px); }
100% { transform: translate(-50%, -50%) translateY(0px); }
`;

const Wrapper = styled.div`
position: absolute; 
top: 50%; 
left:50%; 
animation: ${floatAnimation} 3s infinite ease-in-out; 
`;



export default Allergy; 