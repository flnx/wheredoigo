// React Query Hook
import { useUserLogin } from 'src/hooks/queries/useUserLogin';

// Auth Context
import { useContext, useState } from 'react';
import { AuthContext } from 'src/context/AuthContext';

// Utils
import { extractServerErrorMessage } from 'src/utils/utils';

// Validation
import { userLoginSchema } from 'src/utils/validationSchemas/userSchemas';

export const useSubmitLogin = (state) => {
    const { setUserData } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [login, isLoading, serverError] = useUserLogin();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setError('');

        try {
            await userLoginSchema.validate(state, { abortEarly: false });

            login(state, {
                onSuccess: (result) => {
                    setUserData(result);
                },
                onError: (err) => {
                    setError(extractServerErrorMessage(err));
                },
            });
        } catch (err) {
            setError(err.errors[0] || err.message);
        }
    };

    const guestLoginHandler = () => {
        if (isLoading) return;
        setError('');

        const guestData = {
            email: 'wheredoigoguest@yahoo.com',
            password: 'password123',
        };

        login(guestData, {
            onSuccess: (result) => {
                setUserData(result);
            },
            onError: (err) => {
                setError(extractServerErrorMessage(err));
            },
        });
    };

    return { submitHandler, error, serverError, isLoading, guestLoginHandler };
};
