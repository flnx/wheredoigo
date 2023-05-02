import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const logout = async() => {
  const res = await axios.post(apiEndpoints.logout);

  return res;
}