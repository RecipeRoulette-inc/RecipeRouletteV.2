import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "../public/plateForkKnife.jpeg";

const LoginPage = () => {

  return (
    <WrapPage src={img}>
      <LoginForm />
    </WrapPage>
  );
}

//fork and knife image
const WrapPage = styled.div`
background-image: ${({src}) => `url(${src})`};
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

export default LoginPage; 