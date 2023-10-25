import { useState, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext(null); 

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  const handleLogin = async (data) => {
    console.log('make request');
    fetch('/user/login', {
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
        setToken('NickChristinaJerelEdwin');
        const origin = location.state?.from?.path || '/home'; 
        navigate(origin);
      })
      .catch((error) => {
        // display error in console
        console.error('There was a problem with the fetch operation:', error); 
        // display error to user
        alert(error);
      })
 
  };

  const handleSignup = async (data) => {
    fetch('/user/signup', {
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

  const handleLogout = () => {
    setToken(null);
  }; 

  const value = {
    token, 
    onLogin: handleLogin, 
    onSignup: handleSignup, 
    onLogout: handleLogout, 
  }

  return (
    <AuthContext.Provider value={ value } >
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider; 