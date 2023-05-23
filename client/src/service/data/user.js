import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const changeUserAvatar = async (formData) => {
    const result = await axios.put(apiEndpoints.changeAvatar, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return result.data;
};

export const getUserLastActivities = async () => {
    const result = await axios.get(apiEndpoints.userLastActivities);

    return result.data;
};


