import { render, screen, userEvent, waitFor } from 'src/utils/test-utils';
import { ImagesManager } from '../ImagesManager';

import { useAddDestinationNewImages } from 'src/hooks/queries/useAddDestinationNewImages';
import { useDeleteDestinationImage } from 'src/hooks/queries/useDeleteDestinationImage';
import { images, newlyAddedImages } from 'src/mocks/exampleMocks';
import { applyCloudinaryTransformation } from 'src/utils/utils';

describe('ImagesManager rendering testing', () => {
    let props;
    const testId = 'testId';

    beforeEach(() => {
        props = {
            imagesData: images,
            deleteImageHook: () => useDeleteDestinationImage(testId),
            addImageHook: () => useAddDestinationNewImages(testId),
            isLoading: false,
        };

        // replaces the vitest functions with actual react query hooks
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
});

describe('ImagesManager functionality testing', () => {
    let mockCreateObjectURL;
    let props;
    const testId = 'testId';

    beforeEach(() => {
        props = {
            imagesData: images,
            deleteImageHook: () => useDeleteDestinationImage(testId),
            addImageHook: () => useAddDestinationNewImages(testId),
            isLoading: false,
        };

        URL.revokeObjectURL = vi.fn();
        mockCreateObjectURL = vi.fn();

        URL.createObjectURL = mockCreateObjectURL;
        mockCreateObjectURL.mockReturnValue('blob:http://localhost:5173/test-path');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('When clicked on uploaded image (on the server) it opens the confirm modal', async () => {
        render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        const firstImage = uploadedImages[0];
        await userEvent.click(firstImage);

        const confirmModal = screen.getByText(/Are you sure you want to delete this image/i);
        expect(confirmModal).toBeInTheDocument();
    });

    it('Checks for cancel button and closes the confirm Modal on Cancel button click', async () => {
        render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        const firstImage = uploadedImages[0];
        await userEvent.click(firstImage);

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        expect(cancelBtn).toBeInTheDocument();

        await userEvent.click(cancelBtn);
        expect(
            screen.queryByText(/Are you sure you want to delete this image/i)
        ).not.toBeInTheDocument();
    });

    it('Checks for delete button and closes the modal after deletion', async () => {
        render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        const firstImage = uploadedImages[0];
        await userEvent.click(firstImage);

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();

        await userEvent.click(deleteButton);
        expect(
            screen.queryByText(/Are you sure you want to delete this image/i)
        ).not.toBeInTheDocument();
    });

    it('Correctly delete image on confirm', async () => {
        const { rerender } = render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        const firstImage = uploadedImages[0];
        await userEvent.click(firstImage);

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        await userEvent.click(deleteButton);

        // Simulated react query onSucccess props update that causes rerendering after img deletion
        const updatedProps = {
            ...props,
            imagesData: props.imagesData.filter(
                // image urls are being transformed, this is why we need cloudinaryTransform
                (img) => applyCloudinaryTransformation(img.imageUrl) !== firstImage.src
            ),
        };

        rerender(<ImagesManager {...updatedProps} />);
        const updatedImages = screen.queryAllByAltText(/uploaded/i);
        expect(updatedImages).toHaveLength(props.imagesData.length - 1); // -1 image
    });

    it('Selects the image files and renders them (as thumbnails) and shows "Add" button', async () => {
        render(<ImagesManager {...props} />);
        const uploadBtnLabel = screen.getByRole('upload-button');
        const input = screen.getByTestId('hidden-file-input');

        const files = [
            new File(['hello'], 'hello.png', { type: 'image/png' }),
            new File(['there'], 'there.png', { type: 'image/png' }),
        ];

        await userEvent.upload(uploadBtnLabel, files);
        expect(input.files[0]).toBe(files[0]);
        expect(input.files[1]).toBe(files[1]);

        const preUploadedImagesThumbnails = screen.getAllByAltText(/image preview/i);
        expect(preUploadedImagesThumbnails).toHaveLength(files.length);

        const AddButton = screen.getByRole('button', { name: 'Add' });
        expect(AddButton).toBeInTheDocument();
    });

    it('Deletes the pre-uploaded images (thumbnails) on click', async () => {
        render(<ImagesManager {...props} />);
        const uploadBtnLabel = screen.getByRole('upload-button');

        const files = [
            new File(['hello'], 'hello.png', { type: 'image/png' }),
            new File(['there'], 'there.png', { type: 'image/png' }),
        ];

        await userEvent.upload(uploadBtnLabel, files);

        const thumbnails = screen.getAllByAltText(/image preview/i);
        const thumbnailToDelete = thumbnails[0];
        await userEvent.click(thumbnailToDelete);

        // After thumbnail deletion the thumbnails length should be decreased by 1
        const updatedThumbnails = screen.queryAllByAltText(/image preview/i);
        expect(updatedThumbnails).toHaveLength(thumbnails.length - 1);
    });

    it('Uploads the images to the server and renders the new ones', async () => {
        const { rerender } = render(<ImagesManager {...props} />);
        const uploadBtnLabel = screen.getByRole('upload-button');

        const files = [
            new File(['hello'], 'hello.png', { type: 'image/png' }),
            new File(['there'], 'there.png', { type: 'image/png' }),
        ];

        await userEvent.upload(uploadBtnLabel, files);

        const addBtn = screen.getByRole('button', { name: 'Add' });
        await userEvent.click(addBtn);

        expect(
            screen.queryByText(/Are you sure you want to delete this image/i)
        ).not.toBeInTheDocument();

        // Simulated react query onSucccess props update that causes rerendering after img upload
        const updatedImagesProps = {
            ...props,
            imagesData: [...props.imagesData, ...newlyAddedImages.imageUrls],
        };

        rerender(<ImagesManager {...updatedImagesProps} />);

        // Checks if the images are added by comparing the sum of files length and old images length
        const updatedImages = screen.getAllByAltText(/uploaded/i);
        expect(updatedImages).toHaveLength(props.imagesData.length + files.length);
    });
});
