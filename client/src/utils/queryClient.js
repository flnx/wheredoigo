import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            // staleTime: 1 * (60 * 1000),
            // refetchInterval: 5 * (60 * 1000),
        },
    },
});
