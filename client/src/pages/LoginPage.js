import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Desktop/Screenshot 2023-10-11 at 3.05.35 PM.png";

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
height: 100vh; 
width: 100vw; 
// overflow: scroll; 
border-radius: 10px;
`;

export default LoginPage; 