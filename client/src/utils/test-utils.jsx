/* eslint-disable import/export */
import { cleanup, render, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

// React Query
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

import { afterEach } from 'vitest';

afterEach(() => {
    cleanup();
});

function customRender(ui, options = {}) {
    return render(ui, {
        // wrap provider(s) here if needed
        wrapper: ({ children }) => (
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </MemoryRouter>
        ),
        ...options,
    });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { waitFor }; // Export the waitFor function

// override render export
export { customRender as render };