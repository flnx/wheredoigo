import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [auth, setUserData] = useLocalStorage('userData');
   
    return (
        <AuthContext.Provider value={{ auth, setUserData }}>
            {props.children}
        </AuthContext.Provider>
    );
};
