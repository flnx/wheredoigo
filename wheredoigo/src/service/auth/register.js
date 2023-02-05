import axios from 'axios';

export const register = async (userData) => {
    const res = await axios.post('/users', userData);

    return res;
};
