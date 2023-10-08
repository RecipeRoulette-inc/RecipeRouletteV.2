import styled from "styled-components";
import { useForm } from 'react-hook-form'
const LoginForm = () => {
  const {register, handleSubmit} = useForm();

  return (
    <WrapForm>
      <Header>Recipe Roulette</Header>
    <Form onSubmit={handleSubmit((data)=> console.log(data))}>
      <Input
        {...register('username', {required: 'This is required'})}
        placeholder='Username'
        />
    
      <Input
        {...register('password', {required: 'This is required'})}
        placeholder='Password'
        />
        
      <Submit type='submit' > Log in</Submit>
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
box-shadow: 0px 0px 15px 12px rgba(234, 225, 229, 0.43);
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
background: #77B6EA;
cursor: pointer; 
`;

export default LoginForm;