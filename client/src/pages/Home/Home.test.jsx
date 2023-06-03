import { MemoryRouter } from 'react-router-dom';
import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
import { Home } from './Home';

describe('Home', () => {
    it('Renders Discover the world', async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            // const headingElement = screen.getByText(
            //     /Discover the world Adventure is out there/i
            // );
            const headingElement = screen.getByRole('heading', { level: 1 });

            expect(headingElement).toHaveTextContent(
                /Discover the world Adventure is out there/i
            );
        });
    });
});
