import { useMutation } from '@tanstack/react-query';
import * as user from '../../service/auth/register';

export const useUserRegister = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => user.register(data),
    });

    return [mutate, isLoading];
};
