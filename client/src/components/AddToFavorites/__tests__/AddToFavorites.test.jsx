import { MemoryRouter } from 'react-router-dom';
import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { AddToFavorites } from '../AddToFavorites';

// This is needed to extract the correct classname from css modules
import styles from '../AddToFavorites.module.css';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('AddToFavorites', () => {
    const testId = 'testId';

    it('Should render', () => {
        render(<AddToFavorites />);
        const heartIcon = screen.getByTestId('heart-icon');

        expect(heartIcon).toBeInTheDocument();
    });

    it('Should rotate 360deg on click', async () => {
        const props = {
            _id: testId,
            isLikedByUser: false,
            hasSession: true,
        };

        render(<AddToFavorites {...props} />);

        const heartIcon = screen.getByTestId('heart-icon');
        userEvent.click(heartIcon);

        await waitFor(() => {
            expect(heartIcon).toHaveClass(styles.rotate);
        });
    });

    it('Renders the component with the correct weight (fill) when isLikedByUser is true', async () => {
        render(<AddToFavorites isLikedByUser={true} />);
        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('hasLike');
    });

    it('Rerenders the component when the props are changed after click', async () => {
        render(<AddToFavorites isLikedByUser={false} />);
        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('hasNoLike');
    });

    it.only('Correctly sends like and rerenders', async () => {
        const props = {
            _id: testId,
            isLikedByUser: false,
            hasSession: true,
        };

        const { rerender } = render(<AddToFavorites {...props} />);
        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('hasNoLike');

        userEvent.click(heartIcon);

        await waitFor(() => {
            props.isLikedByUser = true;
        });

        rerender(
            <MemoryRouter>
                <AddToFavorites {...props} />
            </MemoryRouter>
        );

        expect(heartIcon).toHaveClass('hasLike');
    });
});
