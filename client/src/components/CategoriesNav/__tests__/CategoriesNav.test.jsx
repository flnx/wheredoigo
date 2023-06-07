import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { CategoriesNav } from '../CategoriesNav';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('CategoriesNav', () => {
    let onClick;

    beforeEach(() => {
        onClick = vi.fn();
        render(<CategoriesNav onCategoryClickHandler={onClick} />);
    });

    it('Renders the Adventure Icon with text and it passes the coorect value to the handler ', async () => {
        const adventureIcon = screen.getByTestId('adventure-icon');
        const iconText = screen.getByText(/adventure/i);

        await userEvent.click(adventureIcon);

        expect(adventureIcon).toBeInTheDocument();
        expect(iconText).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Adventure');
    });

    it('Renders the Beach Icon with text and it passes the coorect value to the handler ', async () => {
        const beachIcon = screen.getByTestId('beach-icon');
        const iconText = screen.getByText(/beach/i);

        await userEvent.click(beachIcon);

        expect(beachIcon).toBeInTheDocument();
        expect(iconText).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Beach');
    });

    it('Renders the Culture Icon with text and it passes the coorect value to the handler ', async () => {
        const cultureIcon = screen.getByTestId('culture-icon');
        const iconText = screen.getByText(/beach/i);

        await userEvent.click(cultureIcon);

        expect(cultureIcon).toBeInTheDocument();
        expect(iconText).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Cultural');
    });

    it('Renders the Islands Icon with text and it passes the coorect value to the handler ', async () => {
        const islandsIcon = screen.getByTestId('islands-icon');
        const iconText = screen.getByText(/islands/i);

        await userEvent.click(islandsIcon);

        expect(islandsIcon).toBeInTheDocument();
        expect(iconText).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Islands');
    });

    it('Renders the Islands Icon with text and it passes the coorect value to the handler ', async () => {
        const mountainsIcon = screen.getByTestId('mountain-icon');
        const iconText = screen.getByText(/mountains/i);

        await userEvent.click(mountainsIcon);

        expect(mountainsIcon).toBeInTheDocument();
        expect(iconText).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Mountains');
    });

    it('Renders the Islands Icon with text and it passes the coorect value to the handler ', async () => {
        const snowIcon = screen.getByTestId('snow-icon');
        const iconText = screen.getByText(/snow/i);

        await userEvent.click(snowIcon);

        expect(snowIcon).toBeInTheDocument();
        expect(iconText).toBeInTheDocument();
        expect(onClick).toHaveBeenCalledWith('Snow');
    });
});
