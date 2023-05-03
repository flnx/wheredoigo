import { createContext, useCallback, useMemo, useState } from 'react';
import { queryClient } from '../utils/queryClient';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState(() => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : {};
    });

    const setUserData = useCallback((newValue) => {
        const key = 'userData';
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(newValue));
        queryClient.invalidateQueries();
        queryClient.clear();
        setAuth(newValue);
    }, []);

    const contextValue = useMemo(() => ({
        auth,
        setUserData
    }), [auth, setUserData])

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
