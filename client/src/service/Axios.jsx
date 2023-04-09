import axios from 'axios';
import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

const HOST = 'http://localhost:3000/';

const axiosInstance = axios.create({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

function AxiosInterceptor({ children }) {
    const { auth, setUserData } = useContext(AuthContext);

    const addAccessToken = useCallback((config) => {
            if (auth?.accessToken) {
                config.headers.Authorization = `Bearer ${auth.accessToken}`;
            }
            return config;
        }, [auth?.accessToken]
    );

    const handleUnauthenticated = useCallback((error) => {
            if (error.response && error.response.status === 401) {
                setUserData({});
            }
            return Promise.reject(error);
        }, [setUserData]
    );

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            addAccessToken, 
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            handleUnauthenticated
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [addAccessToken, handleUnauthenticated]);

    return <>{children}</>;
}

export { AxiosInterceptor };
export default axiosInstance;

// The AxiosInterceptor component is responsible for setting up an interceptor for all requests and responses made by Axios. It does this by utilizing the axios.interceptors object, which allows us to add interceptors to all requests and responses.

// At the beginning of the component, we use the useContext hook to access the auth and setUserData variables from the AuthContext. auth contains information about the currently logged in user, including the accessToken that we want to add to the headers of each request.

// Next, we define two functions using the useCallback hook: onRequestSuccess and onResponseError. These functions are responsible for modifying requests and responses as they pass through the interceptor.

// The onRequestSuccess function takes in the config object, which represents the request being made. It checks if there is an access token in the auth object, and if there is, it adds an Authorization header to the request with the access token attached. It then returns the modified config object.

// The onResponseError function takes in an error object, which represents any error that occurs during the request. It checks if the error has a response status of 401 (Unauthorized). If it does, it calls the setUserData function to clear the user's data (including the access token), effectively logging them out. It then returns a rejected Promise with the error object.

// After defining these two functions, we use the useEffect hook to set up the interceptors. In the useEffect callback, we first add the onRequestSuccess function to the axios.interceptors.request object, which modifies the request before it is sent.

// Next, we add the onResponseError function to the axios.interceptors.response object, which is called when a response is received. We use the second argument to axios.interceptors.response.use to pass in a dummy function that simply returns the response, so that the interceptor does not modify the response itself.

// Finally, we return a cleanup function from the useEffect hook that removes the interceptors when the component is unmounted. We use the requestInterceptor and responseInterceptor variables to keep track of the interceptors that were added so that they can be removed later.