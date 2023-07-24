import { images } from 'src/mocks/exampleMocks';
import { render, screen, userEvent } from 'src/utils/test-utils';
import { applyCloudinaryTransformation } from 'src/utils/utils';
import { ImageThumbnailsPreview } from '../ImageThumbnailsPreview';

describe('ImageThumbnailsPreview testing', () => {
    const props = {
        images: images.slice(0, 2),
        handleDeleteImage: vi.fn(),
        isLoading: false,
        alt: '',
    };

    beforeEach(() => {
        props.handleDeleteImage = vi.fn();
    });

    it('Renders the images (transformed)', () => {
        render(<ImageThumbnailsPreview {...props} />);

        const images = screen.getAllByAltText(/image preview/i);

        // Checks if renders the correct amount of images
        expect(images).toHaveLength(props.images.length);

        // Checks if the urls is correct
        images.forEach((image, i) => {
            const url = applyCloudinaryTransformation(props.images[i].imageUrl);
            expect(image).toHaveAttribute('src', url);
        });
    });

    it('Passes the correct image index to the delete handler', async () => {
        render(<ImageThumbnailsPreview {...props} />);
        const images = screen.getAllByAltText(/image preview/i);

        // Clicks on the first image
        await userEvent.click(images[0]);

        // Called once
        expect(props.handleDeleteImage).toHaveBeenCalledTimes(1);

        // The image index is passed correctly (1st prop is event)
        expect(props.handleDeleteImage).toHaveBeenCalledWith(expect.anything(), 0);

        // Clicks on the second image
        await userEvent.click(images[1]);

        // called twice
        expect(props.handleDeleteImage).toHaveBeenCalledTimes(2);

        // The secocnd image index is passed correctly
        expect(props.handleDeleteImage).toHaveBeenCalledWith(expect.anything(), 1);
    });

    it('Sets default alt attribute - "image preview {index}" ', () => {
        render(<ImageThumbnailsPreview {...props} />);
        const images = screen.getAllByAltText(/image preview/i);

        // Checks if the default image alt attribute is correct
        images.forEach((image, i) => {
            const alt = `image preview ${i}`;
            expect(image).toHaveAttribute('alt', alt);
        });
    });

    it('Sets the alt prop (if passed) and changes the default one - "image preview {index}"', async () => {
        const updatedProps = {
            ...props,
            alt: 'uploaded',
        };
        render(<ImageThumbnailsPreview {...updatedProps} />);

        const images = screen.getAllByAltText(/uploaded/i);

        // Checks if the passed alt from props is being set
        images.forEach((image, i) => {
            const alt = `uploaded ${i}`;
            expect(image).toHaveAttribute('alt', alt);
        });
    });
});
