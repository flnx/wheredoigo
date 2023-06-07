import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { DestinationsGrid } from '../DestinationsGrid';
import routeConstants from '../../../constants/routeConstants';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

// const propTypes = {
//     destination: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         city: PropTypes.string.isRequired,
//         country: PropTypes.string.isRequired,
//         imageUrls: PropTypes.string.isRequired,
//     }).isRequired,
//     onDeleteClickHandler: PropTypes.func,
//     isEditable: PropTypes.bool,
//     background: PropTypes.string,
// };

// destinations: PropTypes.array.isRequired,
// isEditable: PropTypes.bool,
// onDeleteClickHandler: PropTypes.func,
// background: PropTypes.string,

describe('ConfirmModal tests', () => {
    const destinations = [
        {
            _id: 'id1',
            country: 'Country One',
            city: 'City One',
            imageUrls:
                'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        },
        {
            _id: 'id2',
            country: 'Country Two',
            city: 'City Two',
            imageUrls:
                'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        },
        {
            _id: 'id3',
            country: 'Country Three',
            city: 'City Three',
            imageUrls:
                'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
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

        // Checks if the delete handler is triggered
        await userEvent.click(deleteBtns[0]);
        expect(onDeleteClickHandler).toBeCalledTimes(1);

        // Checks if it passes the destination id
        expect(onDeleteClickHandler).toHaveBeenCalledWith(destinations[0]._id);

        const editBtns = screen.getAllByRole('link', { name: 'Edit' });
        const { EDIT } = routeConstants.DESTINATIONS;

        // Checks if the buttons have the correcct href link;
        editBtns.forEach((btn, i) => {
            const btnId = destinations[i]._id;
            expect(btn).toHaveAttribute('href', EDIT.routePath(btnId));
        });
    });
});
