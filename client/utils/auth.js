import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

const isLoggedIn = () => {
  const token = cookies.get('bloodBankToken');
  if (token) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export default isLoggedIn;
