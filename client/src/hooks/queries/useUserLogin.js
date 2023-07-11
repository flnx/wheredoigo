import { useMutation } from '@tanstack/react-query';
import * as user from '../../service/auth/login';

export const useUserLogin = () => {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: (data) => user.login(data),
    });

    const serverError = error?.message == 'Network Error' && error;
    return [mutate, isLoading, serverError];
};
