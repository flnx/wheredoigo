import { useMutation } from '@tanstack/react-query';
import * as user from 'src/service/auth/login';

export const useUserLogin = () => {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: (data) => user.login(data),
    });

    const serverError = error && error?.message == 'Network Error';
    return [mutate, isLoading, serverError];
};