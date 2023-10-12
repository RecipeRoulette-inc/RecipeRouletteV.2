import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Downloads/AdobeStock_620122396_Preview.jpeg";

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
background-color: #333;
display: flex; 
align-items: center;
justify-content: center;
height: 75vh; 
width: 50vw; 
border: black;
border-style: solid;
border-width: 13px 13px 13px;
// overflow: scroll; 
border-radius: 35px;
`;

export default LoginPage; 