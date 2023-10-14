import styled from "styled-components";
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  
  const Signup = (data) => {
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        // if response status not 200
        if (!res.ok) {
          // parse response then destruct response body for error property
          return res.json().then(({ error }) => {
            // create an Error object from error property or response statusText
            throw new Error(error|| res.statusText)
          })
        }
        // ! VERIFY the information being returned from the server, if not JSON, do not .json()
        // return res.json();
        return res;
      })
      .then((data) => {
        // handle successful signup
        // store token
        // update redux state
        // ? on successful signup redirect to login page. 
        navigate('/login'); 
      })
      .catch((error) => {
        // display error in console
        console.error('There was a problem with the fetch operation:', error); 
        // display error to user
        alert(error);
      })
  }

  return (
    <WrapForm>
      <Header>Sign Up</Header>
    <Form onSubmit={handleSubmit((data)=> Signup(data))}>
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
background-color: #ee6352;
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