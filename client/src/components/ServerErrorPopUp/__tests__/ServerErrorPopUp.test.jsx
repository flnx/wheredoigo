import { act } from 'react-dom/test-utils';
import { render, screen } from 'src/utils/test-utils';
import { ServerErrorPopUp } from '../ServerErrorPopUp';

describe('ServerErrorPopUp testing', () => {
    const errorMessage = 'test';
    let mockServerError;

    beforeEach(() => {
        mockServerError = {
            response: {
                status: 404,
                data: {
                    message: errorMessage,
                },
            },
        };
    });

    it('Renders Not Found for 404 status', () => {
        render(<ServerErrorPopUp errorMessage={mockServerError} />);

        const serverError = screen.getByText('Not Found');
        expect(serverError).toBeInTheDocument();
    });

    it('Renders Forbidden for 403 status', () => {
        mockServerError.response.status = 403;
        render(<ServerErrorPopUp errorMessage={mockServerError} />);

        const serverError = screen.getByText('Forbidden');
        expect(serverError).toBeInTheDocument();
    });

    it('Renders the server message for 400 status', () => {
        mockServerError.response.status = 400;
        render(<ServerErrorPopUp errorMessage={mockServerError} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();
    });

    it('Renders the server message for 401 status', () => {
        mockServerError.response.status = 401;
        render(<ServerErrorPopUp errorMessage={mockServerError} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();
    });

    it('Renders the server message for 500 status', () => {
        mockServerError.response.status = 500;
        render(<ServerErrorPopUp errorMessage={mockServerError} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();
    });

    it('Renders Network Error if the DB is offline', () => {
        mockServerError.message = 'Network Error'
        render(<ServerErrorPopUp errorMessage={mockServerError} />);

        const serverError = screen.getByText('Network Error');
        expect(serverError).toBeInTheDocument();
    });

    it('Renders a custom Error if a string value is provided', () => {
        render(<ServerErrorPopUp errorMessage={errorMessage} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();
    });

    it('hides the error message after a timeout', async () => {
        vi.useFakeTimers();

        render(<ServerErrorPopUp errorMessage={errorMessage} />);

        const serverError = screen.getByText(errorMessage);
        expect(serverError).toBeInTheDocument();

        act(() => {
            vi.runAllTimers();
        });

        expect(serverError).not.toBeInTheDocument();

        vi.useRealTimers();
    });
});
