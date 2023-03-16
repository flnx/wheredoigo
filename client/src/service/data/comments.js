import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const addComment = async (data) => {
    const comment = await axios.post(apiEndpoints.addComment, data);

    return {
        ...data,
        objectId: comment.data.objectId
    };
};