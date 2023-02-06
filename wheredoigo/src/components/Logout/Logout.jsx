import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as user from '../../service/auth/logout';

export const Logout = () => {
    const { auth, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        user.logout(auth.accessToken).then((res) => {
            setUserData({});
            navigate('/', { replace: true });
        });
    }, []);

    return <div>Logout</div>;
};
