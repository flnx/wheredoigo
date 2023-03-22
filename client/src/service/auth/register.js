import axios from 'axios';

export const register = async (userData) => {
    const res = await axios.post('/register', userData);

    return res;
};
