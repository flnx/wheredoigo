import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 4 * (60 * 1000), // 5 min
            // cacheTime: 10*(60*1000), // 10 mins
            // refetchInterval: 5 * (60 * 1000),
        },
    },
});
