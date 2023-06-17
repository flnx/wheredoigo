import { useMutation } from '@tanstack/react-query';
import { changeUserAvatar } from '../../service/data/user';

export const useChangeUserAvatar = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => changeUserAvatar(data),
    });

    return [mutate, isLoading];
};
