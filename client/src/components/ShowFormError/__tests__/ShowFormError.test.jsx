import { render, screen } from 'src/utils/test-utils';
import { ShowFormError } from '../ShowFormError';

describe('Show testing', () => {
    const errors = ['name lorem ipsum', 'password lorem ipsum', 'city lorem ipsum'];
    const errorParam = 'name';

    it('renders the error message when there is a matching error', () => {
        render(<ShowFormError errors={errors} errorParam={errorParam} />);

        const errorMessage = screen.getByText(/name/i);
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent(/name/i);
    });

    it('does not render the error message when there is no matching error', () => {
        const nonMatchingErrorParam = 'Non-Matching Error';
        render(<ShowFormError errors={errors} errorParam={nonMatchingErrorParam} />);

        const errorMessage = screen.queryByText(/error/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    it('renders null when the errors prop is empty', () => {
        render(<ShowFormError errors={[]} errorParam={errorParam} />);

        const errorMessage = screen.queryByText(/error/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    it('performs case-insensitive matching for error parameters', () => {
        const caseInsensitiveErrorParam = 'pAsSwOrD';
        render(<ShowFormError errors={errors} errorParam={caseInsensitiveErrorParam} />);

        const errorMessage = screen.getByText(/password/i);
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent(/password/i);
    });
});
