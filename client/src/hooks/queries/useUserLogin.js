import { useMutation } from '@tanstack/react-query';
import * as user from '../../service/auth/login';

export const useUserLogin = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => user.login(data),
    });

    return [mutate, isLoading];
};
