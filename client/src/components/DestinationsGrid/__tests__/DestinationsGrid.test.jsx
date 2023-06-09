import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { DestinationsGrid } from '../DestinationsGrid';
import routeConstants from '../../../constants/routeConstants';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('ConfirmModal tests', () => {
    const imageUrl = 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';

    const destinations = [
        {
            _id: 'id1',
            country: 'Country One',
            city: 'City One',
            imageUrls: imageUrl,
        },
        {
            _id: 'id2',
            country: 'Country Two',
            city: 'City Two',
            imageUrls: imageUrl,
        },
        {
            _id: 'id3',
            country: 'Country Three',
            city: 'City Three',
            imageUrls: imageUrl,
        },
    ];

    const destinationsNum = destinations.length;

    it('Renders the destinations', () => {
        render(<DestinationsGrid destinations={destinations} />);

        // Renders the correct number of destinations
        const destinationsGrid = screen.getAllByTestId('destination');
        expect(destinationsGrid).toHaveLength(destinationsNum);

        destinations.forEach((destination) => {
            const countryElement = screen.getByText(destination.country);
            const cityElement = screen.getByText(destination.city);
            const imageElement = screen.getByAltText(destination.city);

            expect(countryElement).toBeInTheDocument();
            expect(cityElement).toBeInTheDocument();
            expect(imageElement).toHaveAttribute('src', destination.imageUrls);
        });
    });

    it('Renders the buttons when isEditable is passed', () => {
        const onDeleteClickHandler = vi.fn();

        render(
            <DestinationsGrid
                destinations={destinations}
                isEditable={true}
                onDeleteClickHandler={onDeleteClickHandler}
            />
        );

        const deleteBtns = screen.getAllByRole('button', { name: 'Delete' });
        const editBtns = screen.getAllByRole('link', { name: 'Edit' });

        // Renders the correct number of buttons
        expect(editBtns).toHaveLength(destinationsNum);
        expect(deleteBtns).toHaveLength(destinationsNum);
    });

    it('Checks if the buttons work properly', async () => {
        const onDeleteClickHandler = vi.fn();

        render(
            <DestinationsGrid
                destinations={destinations}
                isEditable={true}
                onDeleteClickHandler={onDeleteClickHandler}
            />
        );

        const deleteBtns = screen.getAllByRole('button', { name: 'Delete' });

        // Checks if the delete handler is being triggered
        deleteBtns.forEach(async (btn) => {
            userEvent.click(btn);
        });

        await waitFor(() => {
            expect(onDeleteClickHandler).toBeCalledTimes(3);

            // Checks if the destination id is being passed;
            const lastDestinationClickedId = destinations[destinationsNum - 1]._id;
            expect(onDeleteClickHandler).toHaveBeenCalledWith(lastDestinationClickedId);
        });

        const editBtns = screen.getAllByRole('link', { name: 'Edit' });
        const { EDIT } = routeConstants.DESTINATIONS;

        // Checks if the a hrefs have the correct link in order to navigate to the correct page;
        editBtns.forEach((btn, i) => {
            const btnId = destinations[i]._id;
            expect(btn).toHaveAttribute('href', EDIT.routePath(btnId));
        });
    });
});
