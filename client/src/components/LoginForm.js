import styled from "styled-components";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  
  const Login = (data) => {
    console.log('make request');
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type':'application/json'
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
        // ! the response being sent from the server is not JSON
        return res;
      })
      .then((data) => {
        console.log('success')
        // handle successful login
        // store token
        // update redux state
        // TODO: LINK GOES HERE 
        navigate('/home')

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
      <Header>Recipe Roulette</Header>
    <Form onSubmit={handleSubmit((data)=> Login(data))}>
      <Input
        {...register('username', {required: 'This is required'})}
        placeholder='Username'
        />
    
      <Input
        {...register('password', {required: 'This is required'})}
          placeholder='Password'
          type="password"
        />
        
      <Submit type='submit' > Log in</Submit>
      </Form>
      <p> Don't have an account? <Link to={'/signup'}>Sign up</Link> </p>
    </WrapForm>
  )
}; 

const WrapForm = styled.div`
width: 255px; 
height: 255px;
border: 15px solid #2C1A1D;
border-radius: 150px;
box-shadow: 10px 5px 5px black;
padding: 20px 20px; 
// background-color: #01BAEF;
// background-color: #F1BE24;
background-color: #d30502;
// opacity: 1
position: relative;
top: -2px;
left: 7px;
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
padding: 20px;
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

// const p = styled.p `
// border-radius: 10;
// `;

export default LoginForm;