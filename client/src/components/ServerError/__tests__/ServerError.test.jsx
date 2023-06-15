import { act } from 'react-dom/test-utils';
import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { ServerError } from '../ServerError';

describe('ImageThumbnailsPreview testing', () => {
    const errorMessage = 'error test';
    const mockServerError = {
        response: {
            status: 404,
            data: {
                message: errorMessage,
            },
        },
    };

    it('Renders the error message', () => {
        render(<ServerError errorMessage={mockServerError} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();
    });

    it('hides the error message after a timeout', async () => {
        vi.useFakeTimers();

        render(<ServerError errorMessage={mockServerError} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();

        act(() => {
            vi.runAllTimers();
        });

        expect(serverError).not.toBeInTheDocument();

        vi.useRealTimers();
    });
});
