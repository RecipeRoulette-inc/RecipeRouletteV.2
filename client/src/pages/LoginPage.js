import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/bw images/Screenshot 2023-10-12 at 12.34.08 PM.png";

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
background-color: black;
display: flex; 
align-items: center;
justify-content: center;
height: 75vh; 
width: 50vw; 
border: black;
border-style: solid;
border-width: 15px 15px 15px;
// overflow: scroll; 
border-radius: 10px;
`;

export default LoginPage; 