import { MemoryRouter } from 'react-router-dom';
import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { AddToFavorites } from '../AddToFavorites';

describe('Home', () => {
    it('should rotate on click', async () => {
        render(
            <MemoryRouter>
                <AddToFavorites _id="destinationId" isLikedByUser={false} hasSession={true} />
            </MemoryRouter>
        );

        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('_icon_doaw8_1');
    });
});
