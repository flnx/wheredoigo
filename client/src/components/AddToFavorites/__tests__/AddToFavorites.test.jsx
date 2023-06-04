import { MemoryRouter } from 'react-router-dom';
import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { AddToFavorites } from '../AddToFavorites';

import styles from '../AddToFavorites.module.css';

const render = (props) => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    return customRender(
        <MemoryRouter>
            <AddToFavorites {...props} />
        </MemoryRouter>
    );
};

describe('AddToFavorites', () => {
    it('Renders without errors', () => {
        render(<AddToFavorites />);
        const heartIcon = screen.getByTestId('heart-icon');

        expect(heartIcon).toBeInTheDocument();
    });

    it('should rotate on click', async () => {
        render(<AddToFavorites />);
        const heartIcon = screen.getByTestId('heart-icon');
        userEvent.click(heartIcon);

        await waitFor(() => {
            expect(heartIcon).toHaveClass(styles.rotate);
        });
    });

    it('fills/unfills the component with different colors based on isLikedByUser boolean', async () => {
        const sendLikeMock = vi.fn();

        render(
            <AddToFavorites
                isLikedByUser={true}
                _id={'645b7f82afb7e42c0ba43fa4'}
                hasSession={true}
            />
        );

        sendLikeMock();

        const heartIcon = screen.getByTestId('heart-icon');
        userEvent.click(heartIcon);
        expect(sendLikeMock).toBeCalledTimes(1);
    });
});
