import axios from '../Axios';
import { apiEndpoints } from 'src/constants/apiEndpoints';

export const addComment = async (data, placeId) => {
    const comment = await axios.post(apiEndpoints.place.addComment(placeId), data);

    return comment.data;
};

export const removeComment = async (placeId, commentId) => {
    const comment = await axios.delete(
        apiEndpoints.place.deleteComment(placeId, commentId)
    );


    return comment.data;
};

export const generateAIComments = async (placeId) => {
    const comment = await axios.post(apiEndpoints.place.generateAIComments(placeId), {});
    
    return comment.data;
};
