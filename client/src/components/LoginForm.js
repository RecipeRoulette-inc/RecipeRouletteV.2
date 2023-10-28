import styled from "styled-components";
import { useForm } from 'react-hook-form';
import useAuth from "./hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/authInputSlice";


const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { onLogin } = useAuth();

  return (
    <WrapForm>
      <Header>Log in</Header>
      <Form onSubmit={handleSubmit((data) => onLogin(data))}>
        <Input
          {...register('username', { required: 'This is required' })}
          placeholder='Username'
        />

        <Input
          {...register('password', { required: 'This is required' })}
          placeholder='Password'
          type="password"
        />

        <Submit type='submit' > Log in</Submit>
        <p>Not a user? <NavLink to='/signup'>sign up here</NavLink></p>
      </Form>
    </WrapForm>
  )
};

const WrapForm = styled.div`
display: flex;
background-color: rgba(255, 255, 255, 0.5);
flex-direction: column;
justify-content: center;
text-align: center;
width: 400px; 
height: 400px;
// border: 15px solid #2C1A1D;
border-radius: 200px;
// box-shadow: 10px 5px 5px black;
padding: 20px 20px; 

position: relative;
top: 0px;
left: 152px;
`;

const Header = styled.div`
// background-color: rgba(255, 255, 255, 0.5);
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
// background-color: rgba(255, 255, 255, 0.5);
`;

const Input = styled.input`
padding: 5px 5px;
border: 1px solid black;
border-radius: 2.5px;
// background-color: rgba(255, 255, 255, 0.5);
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


export default LoginForm;