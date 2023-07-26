import axios from '../Axios';
import { apiEndpoints } from 'src/constants/apiEndpoints';

export const logout = async() => {
  const res = await axios.post(apiEndpoints.user.logout);

  return res.data;
}