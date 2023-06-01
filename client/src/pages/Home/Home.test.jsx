import { render, screen, userEvent } from '../../utils/test-utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';
import { queryClient } from '../../utils/queryClient';

test('should have San Diego', () => {
    render(
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </MemoryRouter>
    );
    const message = screen.getByText(/Travel any corner of the world/i);
    expect(message).toBeInTheDocument();
});
