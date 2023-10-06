import styled from "styled-components";
import {useForm} from 'react-hook-form'

const LoginForm = () => {
  const {register, handleSubmit} = useForm();

  return (
    <WrapForm>
    <Form onSubmit={handleSubmit((data)=> console.log(data))}>
      <Input
        {...register('username', {required: 'This is required'})}
        placeholder='Username or email'
      />
      <Input
        {...register('password', {required: 'This is required'})}
        placeholder='Password'
      />
      <Submit type='submit' />
    </Form>
    </WrapForm>
  )
}; 

const WrapForm = styled.div`
`; 

const Form = styled.form`
display: flex; 
flex-direction: column; 
background: lightblue;
`;

const Input = styled.input`
background: lightpink;
`;

const Label = styled.label``;

const Submit = styled.button``;

export default LoginForm;