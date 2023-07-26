import axios from '../Axios';
import { apiEndpoints } from 'src/constants/apiEndpoints';

export const changeUserAvatar = async (formData) => {
    const result = await axios.put(apiEndpoints.user.avatar, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return result.data;
};

export const getUserFavorites = async () => {
    const result = await axios.get(apiEndpoints.userFavorites);
    return result.data;
};

export const getUserLastActivities = async () => {
    const result = await axios.get(apiEndpoints.user.activities);

    return result.data;
};

export const deleteUserAccount = async () => {
    const result = await axios.delete(apiEndpoints.user.delete);

    return result.data;
};
