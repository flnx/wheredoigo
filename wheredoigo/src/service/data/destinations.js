import axios from 'axios';

export const getDestinations = async () => {
    return await axios.get('classes/Destination');
};

export const getDestination = async (id) => {
    const res = await axios.get(`classes/Destination/${id}`);

    return res.data;
};