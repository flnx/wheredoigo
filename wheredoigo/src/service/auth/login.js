import axios from 'axios';

export const login = async (userData) => {
    const res = await axios.post('/login', userData);

    return res;
};
