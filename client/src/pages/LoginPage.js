import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "/Users/christinaraether/Desktop/PTRI12/scratch_project/images/final_image.jpeg";

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
background-color: blue;
background-size: cover;
max-width: 100vw;
min-width: 50vw;
max-height: 100vh;
min-height: 50vh;
// background-attachment: fixed;
// margin: auto;
// margin-top: 100px;
// margin-bottom: 100px;
// margin-right: 150px;
// margin-left: 80px;
display: flex;
align-self: center 
position: relative;
align-items: center;
// justify-content: center;
height: 100vh; 
width: 50vw; 
border: black;
border-style: solid;
border-width: 10px 10px 10px;
// overflow: scroll; 
border-radius: 35px;
padding 30px 30px: 
`;

export default LoginPage; 