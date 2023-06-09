import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { Gallery } from '../Gallery';

const props = {
    images: [
        {
            imageUrl: 'https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
            _id: 'id1',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            _id: 'id2',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
            _id: 'id3',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
            _id: 'id4',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/335966/pexels-photo-335966.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
            _id: 'id5',
        },
    ],
    closeGalleryHandler: vi.fn(),
    alt: 'Los Test',
};

describe('Gallery correctly renders the images and sets the main image', () => {
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

    it('When clicked on a secondary image, it sets it as a MAIN Image', async () => {
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

describe('Correctly renders the Arrow and ESC Components and makes sure that they work', () => {
    beforeEach(() => {
        props.closeGalleryHandler = vi.fn();
        render(<Gallery {...props} />);
    });

    it('Renders the (X) Component', () => {
        const escapeButton = screen.getByLabelText('Close gallery');
        expect(escapeButton).toBeInTheDocument();
    });

    it('Triggers the closeGalleryHandler when the X Component is clicked', async () => {
        const escapeButton = screen.getByLabelText('Close gallery');

        await userEvent.click(escapeButton);
        expect(props.closeGalleryHandler).toHaveBeenCalledTimes(1);
    });

    it('Triggers the closeGalleryHandler when the keyboard ESC button is pushed', async () => {
        const escapeButton = screen.getByLabelText('Close gallery');
        await userEvent.keyboard('{Escape}', escapeButton);
        expect(props.closeGalleryHandler).toHaveBeenCalledTimes(1);
    });

    it('Renders RightArrow component if there is a next image and hides it if not', async () => {
        // Shows the right arrow since there is a next image
        const rightArrow = screen.getByLabelText('Next photo');
        expect(rightArrow).toBeInTheDocument();

        // cuts off the main image;
        const secondaryImages = props.images.slice(1);

        // navigates through all images until it reaches the last one
        for (const image of secondaryImages) {
            await userEvent.click(rightArrow);
        }

        // Doesn't show the right arrow since there is not a next image
        expect(rightArrow).not.toBeInTheDocument();
    });

    it('Renders LeftArrow component if there is a prev image and hides it if not', async () => {
        // Wouldn't show the LeftArrow since there is not a previous image
        const leftArrowHidden = screen.queryByLabelText('Previous photo');
        expect(leftArrowHidden).not.toBeInTheDocument();

        // Navigates to the next photo
        const rightArrow = screen.queryByLabelText('Next photo');
        await userEvent.click(rightArrow);

        // ArrowLeft must be visible now (rendered)
        const leftArrow = screen.queryByLabelText('Previous photo');
        expect(leftArrow).toBeInTheDocument();
    });
});

describe('Gallery correctly navigates through images using the keyboard', () => {
    beforeEach(() => {
        props.closeGalleryHandler = vi.fn();
        render(<Gallery {...props} />);
    });

    it('Right Arrow keyboard button navigates right (next image)', async () => {
        let mainImage;
        let mainImageUrl;

        // Current main image
        mainImage = screen.getByAltText(props.alt);
        mainImageUrl = props.images[0].imageUrl;
        expect(mainImage).toHaveAttribute('src', mainImageUrl);

        // Shows the next image after arrow right key is pushed
        const rightArrow = screen.getByLabelText('Next photo');
        await userEvent.keyboard('{ArrowRight}', rightArrow);

        // Check if the new Main image url is correct;
        mainImage = screen.getByAltText(props.alt);
        mainImageUrl = props.images[1].imageUrl;
        expect(mainImage).toHaveAttribute('src', mainImageUrl);
    });

    it('Right Arrow keyboard button navigates left (previous image)', async () => {
        let mainImage;
        let mainImageUrl;
        let imgIndex = 0;

        // Navigates right (next)
        const rightArrow = screen.getByLabelText('Next photo');
        await userEvent.keyboard('{ArrowRight}', rightArrow);
        await userEvent.keyboard('{ArrowRight}', rightArrow);

        // Increasing the index accordingly to match the correct url
        imgIndex += 2;

        // Check if the new Main image is being set correctly by checking the url
        mainImage = screen.getByAltText(props.alt);
        mainImageUrl = props.images[imgIndex].imageUrl;
        expect(mainImage).toHaveAttribute('src', mainImageUrl);

        // Navigates left (previous)
        const leftArrow = screen.getByLabelText('Previous photo');
        await userEvent.keyboard('{ArrowLeft}', leftArrow);

        // Decreasing the index accordingly to match the correct url
        imgIndex--;

        // Check if the new Main image is being set correctly by checking the url
        mainImage = screen.getByAltText(props.alt);
        mainImageUrl = props.images[imgIndex].imageUrl;
        expect(mainImage).toHaveAttribute('src', mainImageUrl);
    });
});
