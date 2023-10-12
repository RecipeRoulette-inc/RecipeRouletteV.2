import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/Screenshot 2023-10-12 at 12.35.04 PM.png";

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