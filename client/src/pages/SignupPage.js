import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import img from "../public/plateForkKnife.jpeg"

const SignupPage = () => {
  return (
    <SignupWrap>
      <SignupForm/>
    </SignupWrap>
  ); 
};

const SignupWrap = styled.div``;

export default SignupPage; 