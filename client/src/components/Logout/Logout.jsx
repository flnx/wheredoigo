import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';
import routeConstants from 'src/constants/routeConstants';

const { HOME } = routeConstants;

export const Logout = () => {
    const { auth, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // user.logout(auth.accessToken).then((res) => {});
        setUserData({});
        navigate(HOME.route, { replace: true });
    }, []);

    return;
};
