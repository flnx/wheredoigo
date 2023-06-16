import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { ImageUploader } from '../ImageUploader';

describe('UploadImagesPreview testing', () => {
    const props = {
        
    }

    it('Shows the upload button', () => {
        render(<ImageUploader {...props} />);
        const uploadBtn = screen.getByRole('upload-button');
        expect(uploadBtn).toBeInTheDocument();
    });



});

describe('ImagesManager functionality testing', () => {
    let mockCreateObjectURL;

    beforeEach(() => {
        URL.revokeObjectURL = vi.fn();

        mockCreateObjectURL = vi.fn();
        URL.createObjectURL = mockCreateObjectURL;
        mockCreateObjectURL.mockReturnValue('blob:http://localhost:5173/test-path');

        const testId = 'testId';
        // replaces the vitest functions with actual react query hooks
        props.deleteImageHook = () => useDeleteDestinationImage(testId);
        props.addImageHook = () => useAddDestinationNewImages(testId);
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

    it('Closes the confirm Modal on Cancel button click', async () => {
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

    it('Correctly delete image on confirm', async () => {
        const { rerender } = render(<ImagesManager {...props} />);

        const uploadedImages = screen.queryAllByAltText(/uploaded/i);
        const firstImage = uploadedImages[0];
        await userEvent.click(firstImage);

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();

        userEvent.click(deleteButton);

        await waitFor(() => {
            // Checks if the Modal is hidden after image is deleted
            expect(
                screen.queryByText(/Are you sure you want to delete this image/i)
            ).not.toBeInTheDocument();
        });

        // Simulated react query onSucccess props update that causes rerendering after img deletion
        const updatedProps = {
            ...props,
            imagesData: props.imagesData.filter((img) => img.imageUrl !== firstImage.src),
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
