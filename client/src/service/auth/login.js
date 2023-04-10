import axios from '../Axios';

export const login = async (userData) => {
    const res = await axios.post('/login', userData);

    return res;
};
