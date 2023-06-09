import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { Gallery } from '../Gallery';

describe('FormSelect Tests', () => {
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
        ],
        closeGalleryHandler: vi.fn(),
        alt: 'Los Test',
    };

    beforeEach(() => {
        props.closeGalleryHandler = vi.fn();
        render(<Gallery {...props} />);
    });

    it('Renders the Gallery with all images', () => {
        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));

        // +1 is added because the secondary images render the main image too
        expect(images).toHaveLength(props.images.length + 1);
    });

    it('Correctly renders the main image', () => {
        // Check if the main image is being shown
        const mainImage = screen.getByAltText(props.alt);
        const url = props.images[0].imageUrl;

        expect(mainImage).toHaveAttribute('src', url);
    });

    it('Correctly renders the secondary images', () => {
        const images = screen.getAllByAltText(new RegExp(props.alt, 'i'));

        // Check if the secondary images are being shown with their valid urls
        // Cuts off the first main image with slice in order to get only the secondary images
        images.slice(1).forEach((image, i) => {
            const validImageUrl = props.images[i].imageUrl;
            expect(image).toHaveAttribute('src', validImageUrl);
        });
    });

    it('When clicked on a secondary images, it sets it as a MAIN Image', async () => {
        let mainImage;
        let expectedImgUrl;

        // Click on a image to set it as a "Main Image"
        const imageToSetAsMain = screen.getByAltText(`${props.alt} 2`);
        expectedImgUrl = props.images[1].imageUrl;
        expect(imageToSetAsMain).toHaveAttribute('src', expectedImgUrl);

        // Clicks on one of the secondary images to set it as a "Main image";
        await userEvent.click(imageToSetAsMain);
        mainImage = screen.getByAltText(props.alt);
        expect(mainImage).toHaveAttribute('src', expectedImgUrl);

        // Click on another image to set it as a "Main Image"
        const anotherImageToSetAsMain = screen.getByAltText(`${props.alt} 3`);
        expectedImgUrl = props.images[2].imageUrl;
        expect(anotherImageToSetAsMain).toHaveAttribute('src', expectedImgUrl);

        // Clicks on one of the secondary images to set it as a "Main image";
        await userEvent.click(anotherImageToSetAsMain);
        mainImage = screen.getByAltText(props.alt);
        expect(mainImage).toHaveAttribute('src', expectedImgUrl);
    });
});
