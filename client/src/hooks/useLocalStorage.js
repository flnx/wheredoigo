import { useState } from 'react';

export const useLocalStorage = (key) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem(key);

        return userData ? JSON.parse(userData) : {};
    });

    const updateUser = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setUser(newValue);
    };

    return [user, updateUser];
};
