import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { CategoriesNav } from '../CategoriesNav';
// This is needed to extract the correct classname from css modules

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('AddToFavorites', () => {
    it('Renders the Adventure Icon with text and if it passes the correct value', async () => {
        const onClick = vi.fn();

        render(<CategoriesNav onCategoryClickHandler={onClick} />);

        const adventureIcon = screen.getByTestId('adventure-icon');
        const iconText = screen.getByText(/adventure/i);

        await userEvent.click(adventureIcon);

        expect(iconText).toBeInTheDocument();
        expect(adventureIcon).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Adventure');
    });

    // it('Renders the Beach Icon with text', () => {
    //     const onClick = vi.fn();
    //     render(<CategoriesNav onCategoryClickHandler={onClick} />);

    //     const adventureIcon = screen.getByTestId('beach-icon');
    //     const iconText = screen.getByText(/beach/i);

    //     expect(iconText).toBeInTheDocument();
    //     expect(adventureIcon).toBeInTheDocument();
    // });
});

// Beach
// Cultural
// Islands
// Mountains
// Snow
