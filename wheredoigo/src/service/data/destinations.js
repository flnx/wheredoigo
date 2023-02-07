import axios from 'axios';

export const getDestinations = async () => {
    const res = await axios.get('classes/Destination');

    return res;
};
