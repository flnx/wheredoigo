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
        const props = {
            _id: testId,
            hasSession: true,
            isLikedByUser: true,
        };

        render(<AddToFavorites {...props} />);
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
        await userEvent.click(heartIcon);
        expect(heartIcon).toHaveClass(styles.rotate);
    });

    it('Renders the component with the correct weight (fill) when isLikedByUser is true', async () => {
        const props = {
            _id: testId,
            hasSession: true,
            isLikedByUser: true,
        };

        render(<AddToFavorites {...props} />);
        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('hasLike');
    });

    it('Rerenders the component when the props are changed after click', async () => {
        const props = {
            _id: testId,
            hasSession: true,
            isLikedByUser: false,
        };

        render(<AddToFavorites {...props} />);
        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('hasNoLike');
    });

    it('Correctly sends like and rerenders', async () => {
        const props = {
            _id: testId,
            isLikedByUser: false,
            hasSession: true,
        };

        const { rerender } = render(<AddToFavorites {...props} />);
        const heartIcon = screen.getByTestId('heart-icon');
        expect(heartIcon).toHaveClass('hasNoLike');
        await userEvent.click(heartIcon);

        props.isLikedByUser = true;

        rerender(
            <MemoryRouter>
                <AddToFavorites {...props} />
            </MemoryRouter>
        );

        expect(heartIcon).toHaveClass('hasLike');
    });
});
