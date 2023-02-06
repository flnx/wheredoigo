import axios from 'axios';

export const logout = async(accessToken) => {
  const res = await axios.post('/logout', null, accessToken);

  return res;
}