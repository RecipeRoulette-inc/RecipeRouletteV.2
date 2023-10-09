import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {

  const handleClick = () => {
    console.log('click')
    fetch('http://localhost:3000/recipes', {
      method: 'GET'
    })
      .then((res) => console.log(res)); 
  }

  return (
    <WrapPage>
      <button onClick={handleClick}>Make Fetch Request To Server</button>
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