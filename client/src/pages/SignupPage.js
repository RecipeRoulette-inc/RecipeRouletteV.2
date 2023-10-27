import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import img from "../public/plateForkKnife.jpeg"

const SignupPage = () => {
  return (
    <SignupWrap src={img}>
      <SignupForm/>
    </SignupWrap>
  ); 
};

const SignupWrap = styled.div`
// background-image: ${({src}) => `url(${src})`};
background-color: rgba(255, 255, 255, 0.5);
background-size: cover;
display: flex;
align-self: center 
position: relative;
align-items: center;
height: 100vh; 
width: 50vw; 
border: black;
border-style: solid;
border-width: 10px 10px 10px;
border-radius: 35px;
`;


export default SignupPage; 