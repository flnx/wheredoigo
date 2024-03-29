/* eslint-disable import/export */
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach } from 'vitest';
// React Query
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

// Reset any request handlers that we may add during the tests,
afterEach(() => {
    cleanup();
});

function customRender(ui, options = {}) {
    return render(ui, {
        // wrap provider(s) here if needed
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
        ...options,
    });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { waitFor }; // Export the waitFor function

// override render export
export { customRender as render };
