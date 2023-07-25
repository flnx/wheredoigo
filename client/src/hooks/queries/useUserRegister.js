import { useMutation } from '@tanstack/react-query';
import * as user from 'src/service/auth/register';

export const useUserRegister = () => {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: (data) => user.register(data),
    });

    const networkError = error && error?.message == 'Network Error';

    return [mutate, isLoading, networkError, error];
};
