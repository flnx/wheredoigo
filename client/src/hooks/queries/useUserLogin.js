import { useMutation } from '@tanstack/react-query';
import * as user from '../../service/auth/login';

export const useLogin = () => {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: (data) => user.login(data),
    });

    return [mutate, isLoading, error];
};
