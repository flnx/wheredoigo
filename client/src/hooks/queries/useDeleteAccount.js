import { useMutation } from '@tanstack/react-query';
import { deleteUserAccount } from 'src/service/data/user';

export const useDeleteAccount = () => {
    const { mutate, error, isLoading } = useMutation({
        mutationFn: () => deleteUserAccount(),
    });

    return [mutate, error, isLoading];
};
