import styled from "styled-components";
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAuth from "./hooks/useAuth";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const { onSignup } = useAuth(); 

  const navigate = useNavigate();

  return (
    <WrapForm>
      <Header>Recipe Roulette</Header>
    <Form onSubmit={handleSubmit((data)=> onSignup(data))}>
      <Input
        {...register('username', {required: 'This is required'})}
        placeholder='Username'
        />
    
      <Input
        {...register('password', {required: 'This is required'})}
        placeholder='Password'
        />
        
      <Submit type='submit' >Sign up</Submit>
    </Form>
    </WrapForm>
  )
}; 

const WrapForm = styled.div`
width: 300px; 
height: 300px;
border: 1px solid black;
border-radius: 5px;
padding: 20px 20px; 
`; 

const Header = styled.div`
display: flex; 
align-items: center;
justify-content: center;
padding: 20px 20px;
`;


const Form = styled.form`
display: flex; 
flex-direction: column; 
gap: 10px
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
background: grey;
cursor: pointer; 

&:hover {
  background: black;
}

`;

export default SignupForm; 