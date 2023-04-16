import axios from 'axios';
import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getToken } from '../utils/getToken';

const HOST = 'http://localhost:3000/';

const axiosInstance = axios.create({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
    },
});

function AxiosInterceptor({ children }) {
    const { auth, setUserData } = useContext(AuthContext);

    const addAccessToken = useCallback(
        (config) => {
            const token = auth?.accessToken;

            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        [auth?.accessToken]
    );

    const handleUnauthenticated = useCallback(
        (error) => {
            if (error.response && error.response.status === 401) {
                setUserData({});
            }
            return Promise.reject(error);
        },
        [setUserData]
    );

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(addAccessToken, (error) =>
            Promise.reject(error)
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
