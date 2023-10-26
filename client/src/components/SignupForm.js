import styled from "styled-components";
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAuth from "./hooks/useAuth";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const { onSignup } = useAuth(); 


  return (
    <WrapForm>
      <Header>Sign Up</Header>
    <Form onSubmit={handleSubmit((data)=> onSignup(data))}>
      <Input
        {...register('username', {required: 'This is required'})}
        placeholder='Username'
        />
    
      <Input
        {...register('password', {required: 'This is required'})}
          placeholder='Password'
          type='password'
        />
        
      <Submit type='submit' >Sign up</Submit>
    </Form>
    </WrapForm>
  )
}; 

const WrapForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
width: 400px; 
height: 400px;
border: 15px solid #2C1A1D;
border-radius: 200px;
box-shadow: 10px 5px 5px black;
padding: 20px 20px; 
background-color: rgba(255, 255, 255, 0.5);
position: relative;
top: 0px;
left: 152px;
`; 

const Header = styled.div`
display: flex; 
align-items: center;
justify-content: center;
padding: 15px 10px;
text-align: center;
line-height: 1.3;
font-size: 30px;
font-weight: 700;
text-shadow: 2px 2px 1px white;
`;


const Form = styled.form`
justify-content: center;
display: flex; 
flex-direction: column; 
gap: 30px
padding: 30px 30px;
`;

const Input = styled.input`
padding: 5px 5px;
border: 1px solid black;
border-radius: 2.5px;
`;

const Label = styled.label``;

const Submit = styled.button`
color: white;
padding: 7px 7px;
border: none;
border-radius: 5px;
background: #363636;
cursor: pointer; 

&:hover {
  background: black;
}
`;

export default SignupForm; 