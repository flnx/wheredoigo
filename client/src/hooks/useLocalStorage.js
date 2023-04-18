import { useState } from 'react';
import { queryClient } from '../utils/queryClient';


export const useLocalStorage = (key) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem(key);

        return userData ? JSON.parse(userData) : {};
    });

    const updateUser = (newValue) => {
        localStorage.removeItem('userData');
        localStorage.setItem(key, JSON.stringify(newValue));
        queryClient.invalidateQueries();
        queryClient.clear()
        setUser(newValue);
    };

    return [user, updateUser];
};
