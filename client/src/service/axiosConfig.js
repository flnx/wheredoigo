import axios from 'axios';

const HOST = 'http://localhost:3000/';
// const APP_ID = '0vFwOMDrlF6WIAFxLOFQL4DrU8phO0dSpWtrfV1Y';
// const API_KEY = 'ICrM6mXlDvJvxfttSk8rVYyshQvmfUrVe85tjfei';

axios.defaults.baseURL = HOST;
axios.defaults.headers.common = {
    // 'X-Parse-Application-Id': APP_ID,
    // 'X-Parse-REST-API-Key': API_KEY,
    'Content-Type': 'application/json',
};

// export const requester = axios.create({
//     baseURL: HOST,
//     headers: {
//         'X-Parse-Application-Id': APP_ID,
//         'X-Parse-REST-API-Key': API_KEY,
//         'Content-Type': 'application/json',
//     },
// });