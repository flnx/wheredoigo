import { useMutation } from '@tanstack/react-query';
import * as user from '../../service/auth/register';

export const useUserRegister = () => {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: (data) => user.register(data),
    });

    const serverError = error?.message == 'Network Error' && error;

    return [mutate, isLoading, serverError];
};
