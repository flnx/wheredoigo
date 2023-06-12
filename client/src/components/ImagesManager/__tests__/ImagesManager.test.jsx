import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { ImagesManager } from '../ImagesManager';

import { useAddDestinationNewImages } from '../../../hooks/queries/useAddDestinationNewImages';
import { useDeleteDestinationImage } from '../../../hooks/queries/useDeleteDestinationImage';

describe('Gallery correctly renders the images and sets the main image', () => {
    const props = {
        imagesData: [
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
        ],
        deleteImageHook: vi.fn(),
        addImageHook: vi.fn(),
        isLoading: false,
    };

    beforeEach(() => {
        const testId = 'testId123';
        // replaces the vitest functions with actual react query hooks
        props.deleteImageHook = () => useDeleteDestinationImage(testId);
        props.addImageHook = () => useAddDestinationNewImages(testId);
    });

    it('Renders the ImagesManager with the current destination/place images (if any)', () => {
        render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        expect(uploadedImages).toHaveLength(props.imagesData.length);
    });

    it('Shows appropriate message when there is no images', () => {
        const propsWithoutImages = {
            ...props,
            imagesData: [],
        };
        render(<ImagesManager {...propsWithoutImages} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        expect(uploadedImages).toHaveLength(0);

        const noImagesText = screen.getByText(/no images/i);
        expect(noImagesText).toBeInTheDocument();
    });

    it('Shows the upload button', () => {
        render(<ImagesManager {...props} />);
        const uploadBtn = screen.getByRole('upload-button');
        expect(uploadBtn).toBeInTheDocument();
    });

    it('When clicked on already uploaded image (on the server) it triggers confirm modal', async () => {
        render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        const firstImage = uploadedImages[0];
        await userEvent.click(firstImage);

        const confirmModal = screen.getByText(/Are you sure you want to delete this image/i);
        expect(confirmModal).toBeInTheDocument();
    });
});
