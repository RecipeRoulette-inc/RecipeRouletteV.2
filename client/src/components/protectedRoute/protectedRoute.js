import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
  const loggedin = useSelector((state) => state.authInput)
  const location = useLocation();

  if (!loggedin.token) {
    return <Navigate to='/login' replace state={{from:location}} />
  }

  return children;
};

export default ProtectedRoute