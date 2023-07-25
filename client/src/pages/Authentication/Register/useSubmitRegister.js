// React Query Hooks
import { useUserRegister } from 'src/hooks/queries/useUserRegister';

// Auth Context
import { useContext, useState } from 'react';
import { AuthContext } from 'src/context/AuthContext';

// Utils
import { extractServerErrorMessage } from 'src/utils/utils';

// Validation
import { userRegisterSchema } from 'src/utils/validationSchemas/userSchemas';

export const useSubmitRegister = (state) => {
    const { setUserData } = useContext(AuthContext);
    const [register, isLoading, networkError, serverError] = useUserRegister();
    const [errors, setErrors] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setErrors('');

        try {
            await userRegisterSchema.validate(state, { abortEarly: false });

            register(state, {
                onSuccess: (result) => setUserData(result),
            });
        } catch (err) {
            setErrors(err.errors || [err.message]);
        }
    };

    const serverErrMsg = extractServerErrorMessage(serverError);

    return { submitHandler, errors, networkError, isLoading, serverErrMsg };
};
