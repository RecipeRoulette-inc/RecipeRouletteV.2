import { useContext } from 'react';
import { AuthContext } from '../authentication/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth; 