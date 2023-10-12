import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/AdobeStock_351574443_Preview.jpeg";

const LoginPage = () => {

  return (
    <WrapPage src={img}>
      <LoginForm />
    </WrapPage>
  );
}

const WrapPage = styled.div`
background-image: ${({src}) => `url(${src})`};
background-size: cover;
display: flex; 
align-items: center;
justify-content: center;
height: 75vh; 
width: 50vw; 
border-style: solid;
border-width: 15px 15px 15px;
// overflow: scroll; 
border-radius: 10px;
`;

export default LoginPage; 