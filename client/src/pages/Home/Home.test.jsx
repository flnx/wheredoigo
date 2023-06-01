import { render, screen } from '@vitejs/plugin-react';
import { Home } from './Home';

it('should have San Diego', () => {
    render(<Home />);
    const message = screen.queryByText(/San Diego/i);
    expect(message).toBeVisible();
});
