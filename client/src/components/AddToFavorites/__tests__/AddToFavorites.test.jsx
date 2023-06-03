import { MemoryRouter } from 'react-router-dom';
import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { AddToFavorites } from '../AddToFavorites';

import styles from '../AddToFavorites.module.css';

describe('Home', () => {
    let heartIcon;

    beforeEach(() => {
        render(
            <MemoryRouter>
                <AddToFavorites _id="destinationId" isLikedByUser={false} hasSession={true} />
            </MemoryRouter>
        );

        heartIcon = screen.getByTestId('heart-icon');
    });

    it('Should render the Heart component', () => {
        expect(heartIcon).toBeInTheDocument();
    });

    it('should rotate on click', async () => {
        userEvent.click(heartIcon);

        await waitFor(() => {
            expect(heartIcon).toHaveClass(styles.rotate);
        });
    });
});
