import { QueryClient } from '@tanstack/react-query';


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            // staleTime: 2 * (60 * 1000), // 2 min
            // cacheTime: 10*(60*1000), // 10 mins
            // refetchInterval: 5 * (60 * 1000),
            staleTime: 0, // 2 min
            cacheTime: 0, // 2 min
        },
    },
});
