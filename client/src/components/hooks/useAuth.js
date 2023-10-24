import { useContext } from 'react'; 
import { AuthContext } from '../authentication/AuthProvider';
//1
const useAuth = () => {
  return useContext(AuthContext); 
}

export default useAuth; 