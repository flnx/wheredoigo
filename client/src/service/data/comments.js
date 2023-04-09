import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const addComment = async (data, placeId) => {
    const comment = await axios.post(apiEndpoints.addComment(placeId), data);
    return comment.data;
};
