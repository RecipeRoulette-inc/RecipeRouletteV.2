import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {

  return (
    <WrapPage>
      <LoginForm />
    </WrapPage>
  );
}

const WrapPage = styled.div`
display: flex; 
align-items: center;
justify-content: center;
height: 100vh; 
width: 100vw; 
overflow: scroll; 
`;

export default LoginPage; 