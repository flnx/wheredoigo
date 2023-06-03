import { MemoryRouter } from 'react-router-dom';
import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { AddToFavorites } from '../AddToFavorites';

import styles from '../AddToFavorites.module.css';

describe('Home', () => {
    it('should rotate on click', async () => {
        render(
            <MemoryRouter>
                <AddToFavorites _id="destinationId" isLikedByUser={false} hasSession={true} />
            </MemoryRouter>
        );

        const heartIcon = screen.getByTestId('heart-icon');

        userEvent.click(heartIcon);

        await waitFor(() => {
            expect(heartIcon).toHaveClass(styles.rotate);
        });
    });
});
