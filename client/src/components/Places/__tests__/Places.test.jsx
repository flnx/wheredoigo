import { MemoryRouter } from 'react-router-dom';
import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { Places } from '../Places';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('ImageThumbnailsPreview testing', () => {
    const props = {
        places: [
            {
                _id: 'test-id-1',
                type: 'Explore',
                imageUrl:
                    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                averageRating: 3,
                name: 'The Test',
                country: 'Netherlands',
                city: 'Amsterdam',
            },
            {
                _id: 'test-id-2',
                type: 'Eat',
                imageUrl:
                    'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                averageRating: 5,
                name: 'Testler',
                country: 'Bulgaria',
                city: 'Varna',
            },
        ],
        onDeleteClickHandler: vi.fn(),
        isLoading: false,
        isOwner: false,
    };

    beforeEach(() => {
        props.onDeleteClickHandler = vi.fn();
    });

    it('Renders all the places with the correct props', () => {
        render(<Places {...props} />);

        // Rendered places
        const placeElements = screen.getAllByRole('link');
        expect(placeElements).toHaveLength(props.places.length);

        props.places.forEach((place) => {
            // Assert the place images
            expect(screen.getByAltText(place.name)).toHaveAttribute('src', place.imageUrl);

            // Assert the place names
            expect(screen.getByText(place.name)).toBeInTheDocument();
            
            // Assert the place city and country
            expect(screen.getByText(`${place.city}, ${place.country}`)).toBeInTheDocument();
        });

        // Renders the Stars rating
        const starsRating = screen.getAllByLabelText('Stars rating');
        // Each place is rendered with total amount of 5 stars
        // This tests if the stars are rendered, not the place rating itself (that fills the stars)
        const totalStars = props.places.length * 5;
        expect(starsRating).toHaveLength(totalStars);
    });

    it('Does not render the buttons if isOwner is false', () => {
        render(<Places {...props} />);

        const deleteButtons = screen.queryAllByRole('button', { name: /delete/i });
        expect(deleteButtons).toHaveLength(0);

        const editButtonLinks = screen.queryAllByRole('link', { name: /edit/i });
        expect(editButtonLinks).toHaveLength(0);
    });

    it('Renders the buttons if isOwner is true', () => {
        const updatedProps = { ...props, isOwner: true };
        render(<Places {...updatedProps} />);

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        expect(deleteButtons).toHaveLength(props.places.length);

        const editButtonLinks = screen.getAllByRole('link', { name: /edit/i });
        expect(editButtonLinks).toHaveLength(props.places.length);
    });

    it('Would not render the buttons if isLoading is true', async () => {
        const updatedProps = { ...props, isOwner: true, isLoading: true };
        render(<Places {...updatedProps} />);

        const deleteButtons = screen.queryAllByRole('button', { name: /delete/i });
        expect(deleteButtons).toHaveLength(0);

        const editButtonLinks = screen.queryAllByRole('link', { name: /edit/i });
        expect(editButtonLinks).toHaveLength(0);
    });

    it('Would not render the place props and images if isLoading is true', () => {
        const updatedProps = { ...props, isOwner: true, isLoading: true };
        render(<Places {...updatedProps} />);

        props.places.forEach((place) => {
            expect(screen.queryByAltText(place.name)).not.toBeInTheDocument();
            expect(screen.queryByText(place.name)).not.toBeInTheDocument();
            expect(
                screen.queryByText(`${place.city}, ${place.country}`)
            ).not.toBeInTheDocument();
        });
    });

    it('Calls the onDeleteHandler and passes the _id', async () => {
        const updatedProps = { ...props, isOwner: true };
        render(<Places {...updatedProps} />);

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        await userEvent.click(deleteButtons[0]);

        expect(props.onDeleteClickHandler).toHaveBeenCalledTimes(1);
        expect(props.onDeleteClickHandler).toHaveBeenCalledWith(props.places[0]._id);
    });
});
