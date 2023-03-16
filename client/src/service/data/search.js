import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints'

export const getPlacesByCountry = async (userSearch) => {
    const places = await axios.get(apiEndpoints.searchPlacesByCountry(userSearch));
    return places.data.results;
}