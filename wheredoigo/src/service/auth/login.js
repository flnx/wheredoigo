import axios from 'axios';

import axios from 'axios';

export const login = async (userData) => {
    const res = await axios.post('/users', userData);

    return res;
};
