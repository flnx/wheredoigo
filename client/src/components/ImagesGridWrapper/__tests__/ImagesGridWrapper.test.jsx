import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { ImagesGridWrapper } from '../ImagesGridWrapper';

describe('Gallery correctly renders the images and sets the main image', () => {
    const props = {
        images: [
            {
                imageUrl:
                    'https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                _id: 'id1',
            },
            {
                imageUrl:
                    'https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                _id: 'id2',
            },
            {
                imageUrl:
                    'https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                _id: 'id3',
            },
            {
                imageUrl:
                    'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                _id: 'id4',
            },
            {
                imageUrl:
                    'https://images.pexels.com/photos/335966/pexels-photo-335966.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                _id: 'id5',
            },
            {
                imageUrl:
                    'https://images.pexels.com/photos/335966/pexels-photo-335966.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
                _id: 'id6',
            },
        ],
        onClickHandler: vi.fn(),
        alt: 'Los Test',
        isLoading: false,
    };

    beforeEach(() => {
        props.onClickHandler = vi.fn();
    });

    it('Renders the component with 5 images (max)', () => {
        render(<ImagesGridWrapper {...props} />);

        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));

        // Always shows 5 images (max), even though there is more in the array
        expect(images).toHaveLength(images.length);
        expect(images.length).not.toBeGreaterThan(5);
    });

    it('Renders the 1st image in the array as a main image and it has url', () => {
        render(<ImagesGridWrapper {...props} />);
        const mainImage = screen.getByAltText(props.alt);
        expect(mainImage).toHaveAttribute('src');

        const firstImageInArrayUrl = props.images[0].imageUrl;
        expect(mainImage).toHaveAttribute('src', firstImageInArrayUrl);
    });

    it('Renders next 4 images (without the main image) as secondary images', async () => {
        render(<ImagesGridWrapper {...props} />);

        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));
        // Slices out the 1st (main image)
        const secondaryImages = images.slice(1);

        // Checks if the secondary images are correctly visualized by checking their url
        secondaryImages.forEach((image, i) => {
            // Since the 1st (main) image is sliced out from images...
            // ..we increment the index by 1 for each iteration...
            // ..so we can extract the correct secondary images and their urls from props.images;
            const url = props.images[i + 1].imageUrl;
            expect(image).toHaveAttribute('src', url);
        });
    });

    it('Renders the secondary images divs if not any secondary images', () => {
        props.images = [];
        render(<ImagesGridWrapper {...props} />);

        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));

        // Slices out the 1st div
        const secondaryImageDivs = images.slice(1);
        expect(secondaryImageDivs).toHaveLength(secondaryImageDivs.length);
    });

    it('Renders the "Show all images" button', () => {
        render(<ImagesGridWrapper {...props} />);

        const showAllBtn = screen.getByRole('button', { name: /show all images/i });
        expect(showAllBtn).toBeInTheDocument();
    });

    it('onClickHandler works on Main Image Click', async () => {
        render(<ImagesGridWrapper {...props} />);

        const mainImage = screen.getByAltText(props.alt);
        await userEvent.click(mainImage);

        expect(props.onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('onClickHandler works on secondary Images Click', async () => {
        render(<ImagesGridWrapper {...props} />);

        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));
        const secondaryImages = images.slice(1);

        for (const image of secondaryImages) {
            userEvent.click(image);
        }

        await waitFor(() => {
            expect(props.onClickHandler).toHaveBeenCalledTimes(secondaryImages.length);
        });
    });

    it('onClickHandler works on "Show all images" button click', async () => {
        render(<ImagesGridWrapper {...props} />);

        const showAllBtn = screen.getByRole('button', { name: /show all images/i });
        await userEvent.click(showAllBtn);
        expect(props.onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('Does not render the secondary images if the screen is under 798px', () => {
        resizeToSmallerScreen();
        render(<ImagesGridWrapper {...props} />);
        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));

        expect(images).toHaveLength(1);
    });
});

function resizeToSmallerScreen() {
    window.innerWidth = 797;
    window.innerHeight = 667;

    window.resizeTo = (width, height) => {
        window.innerWidth = width || window.innerWidth;
        window.innerHeight = height || window.innerHeight;
        window.dispatchEvent(new Event('resize'));
    };
}

// Alternative to resizeToSmallerScreen (preferable but more complex)

// const smallerScreenQuery = '(max-width: 797px)';
  
// // Add a media query to simulate a smaller screen resolution
// const mediaQueryList = window.matchMedia(smallerScreenQuery);
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: query === smallerScreenQuery,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // Not necessary for this test
//     removeListener: jest.fn(), // Not necessary for this test
//   })),
// });
