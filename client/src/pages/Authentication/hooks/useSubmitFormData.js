import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { extractServerErrorMessage } from '../../../utils/utils';
import { validateLoginData } from '../../../utils/userDataValidators';

export const useSubmitFormData = (state, submitFn, isLoading) => {
    const { setUserData } = useContext(AuthContext);
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setError('');

        const hasError = validateLoginData(state);

        if (hasError) {
            return setError(hasError);
        }

        submitFn(state, {
            onSuccess: (result) => {
                setUserData(result);
            },
            onError: (err) => {
                setError(extractServerErrorMessage(err));
            },
        });
    };

    return [submitHandler, error];
};
