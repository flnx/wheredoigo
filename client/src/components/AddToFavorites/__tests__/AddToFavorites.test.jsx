import { MemoryRouter } from 'react-router-dom';
import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { AddToFavorites } from '../AddToFavorites';

import styles from '../AddToFavorites.module.css';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('AddToFavorites', () => {
    // it('Renders without errors', () => {
    //     render(<AddToFavorites />);
    //     const heartIcon = screen.getByTestId('heart-icon');

    //     expect(heartIcon).toBeInTheDocument();
    // });

    // it('should rotate on click', async () => {
    //     render(<AddToFavorites />);
    //     const heartIcon = screen.getByTestId('heart-icon');
    //     userEvent.click(heartIcon);

    //     await waitFor(() => {
    //         expect(heartIcon).toHaveClass(styles.rotate);
    //     });
    // });

    // it('Renders the component with a like handler and "filled" style', async () => {
    //     render(<AddToFavorites isLikedByUser={true} />);
    //     const heartIcon = screen.getByTestId('heart-icon');
    //     expect(heartIcon).toHaveClass('hasLike');
    // });

    it('Renders the component with a dislike handler and "regular" style', async () => {
        render(<AddToFavorites isLikedByUser={false} />);
        const heartIcon = screen.getByTestId('heart-icon');
        console.log(heartIcon)
        expect(heartIcon).toHaveClass('hasNoLike');
    });

    // it('Renders the component with a dislike handler and "regular" style', async () => {
    //     render(<AddToFavorites isLikedByUser={false} />);
    //     const heartIcon = screen.getByTestId('heart-icon');
    //     userEvent.click(heartIcon);

    //     expect(heartIcon).toHaveClass('hasNoLike');
    // });
});
