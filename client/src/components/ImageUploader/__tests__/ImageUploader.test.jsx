import { render, screen, userEvent } from 'src/utils/test-utils';
import { ImageUploader } from '../ImageUploader';

describe('ImageUploader testing', () => {
    let addImagesMock;

    beforeEach(() => {
        addImagesMock = vi.fn();
        render(<ImageUploader addImages={addImagesMock} />);
    });

    it('Renders the upload button', () => {
        const uploadBtn = screen.getByRole('upload-button');
        expect(uploadBtn).toBeInTheDocument();
    });

    it('Selects the image files', async () => {
        const uploadBtnLabel = screen.getByRole('upload-button');
        const input = screen.getByTestId('hidden-file-input');

        const files = [
            new File(['hello'], 'hello.png', { type: 'image/png' }),
            new File(['there'], 'there.png', { type: 'image/png' }),
        ];

        await userEvent.upload(uploadBtnLabel, files);
        expect(input.files[0]).toBe(files[0]);
        expect(input.files[1]).toBe(files[1]);
    });

    it('Passes the uploaded files to the handler', async () => {
        const uploadBtnLabel = screen.getByRole('upload-button');

        const files = [
            new File(['hello'], 'hello.png', { type: 'image/png' }),
            new File(['there'], 'there.png', { type: 'image/png' }),
        ];

        await userEvent.upload(uploadBtnLabel, files);
        expect(addImagesMock).toHaveBeenCalledWith(expect.any(FileList));
        expect(addImagesMock.mock.calls[0][0]).toHaveLength(files.length);
    });
});
