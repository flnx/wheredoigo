import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
import { Home } from './Home';

describe('Home', () => {
    it('Renders Discover the world', async () => {
        render(<Home />);
        
        await waitFor(() => {
            const headingElement = screen.getByText(
                /Discover the world Adventure is out there/i
            );

            expect(headingElement).toBeInTheDocument();
        });
    });
});
