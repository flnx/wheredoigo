import axios from '../Axios';
import { apiEndpoints } from 'src/constants/apiEndpoints';

export const login = async ({ email, password }) => {
    const userData = {
        email,
        password,
    };

    const res = await axios.post(apiEndpoints.user.login, userData);

    return res.data;
};
