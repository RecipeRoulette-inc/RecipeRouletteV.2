import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Desktop/Screenshot 2023-10-12 at 6.04.44 PM.png";

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

// background-attachment: fixed;

margin: auto;
// display: block;
// background-color: #333;
display: flex; 
// position: relative;
align-items: center;
justify-content: center;
height: 75vh; 
width: 50vw; 
border: black;
border-style: solid;
border-width: 13px 13px 13px;
// overflow: scroll; 
border-radius: 35px;
padding 20px 20px: 
`;

export default LoginPage; 