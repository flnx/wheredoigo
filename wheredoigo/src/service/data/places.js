import axios from 'axios';

const endpoints = {
    place: (id) => 'classes/Place?where=' + encodeURIComponent(`{"destination":{"__type":"Pointer","className":"Destination","objectId":"${id}"}}`),
};

export const getPlaces = async (id) => {
   const placesData = await axios.get(endpoints.place(id));

   return placesData.data.results;
};