import { render, screen, userEvent } from 'src/utils/test-utils';
import { SearchBar } from '../SearchBar';

describe('SearchBar testing', () => {
    let submitHandlerMock;

    beforeEach(() => {
        submitHandlerMock = vi.fn();
        render(<SearchBar searchParamsSubmitHandler={submitHandlerMock} />);
    });

    it('Renders the SearchBar', () => {
        const input = screen.getByRole('search');
        expect(input).toBeInTheDocument();

        const submitBtn = screen.getByRole('button');
        expect(submitBtn).toBeInTheDocument();

        const searchIcon = screen.getByLabelText('Search icon');
        expect(searchIcon).toBeInTheDocument();
    });

    it('Updates the input when typing', async () => {
        const input = screen.getByRole('search');
        await userEvent.type(input, 'Hello, World!');

        expect(input).toHaveValue('Hello, World!');
    });

    it('Correctly passes the input text value to the submit handler', async () => {
        const input = screen.getByRole('search');
        await userEvent.type(input, 'Hello, World!');

        const submitBtn = screen.getByRole('button');
        await userEvent.click(submitBtn);

        expect(submitHandlerMock).toHaveBeenCalledTimes(1);
        expect(submitHandlerMock).toHaveBeenCalledWith('Hello, World!');
    });
});
