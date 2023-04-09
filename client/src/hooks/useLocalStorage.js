import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem(key);

        return userData ? JSON.parse(userData) : defaultValue;
    });

    const updateUser = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setUser(newValue);
    };

    return [user, updateUser];
};
