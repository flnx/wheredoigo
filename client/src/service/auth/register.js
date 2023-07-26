import axios from '../Axios';
import { apiEndpoints } from 'src/constants/apiEndpoints';

export const register = async ({ username, password, email }) => {
    const userData = {
        username,
        password,
        email,
    };
    const res = await axios.post(apiEndpoints.user.register, userData);

    return res.data;
};
