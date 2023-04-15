import axios from 'axios';
import { useContext, useEffect, useCallback, useState } from 'react';
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