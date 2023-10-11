import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Downloads/top-view-fresh-vegetables-various-spices-small-bowls-wooden-spoons-table-free-space.jpg";

const LoginPage = () => {

  return (
    <WrapPage src={img}>
      <LoginForm />
    </WrapPage>
  );
}

const WrapPage = styled.div`
background-image: ${({src}) => `url(${src})`};
display: flex; 
align-items: center;
justify-content: center;
height: 100vh; 
width: 100vw; 
// overflow: scroll; 
`;

export default LoginPage; 