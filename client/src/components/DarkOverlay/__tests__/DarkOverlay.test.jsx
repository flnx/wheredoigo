import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent } from 'src/utils/test-utils';

import { DarkOverlay } from '../DarkOverlay';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('ConfirmModal tests', () => {
    it('Renders without errors', () => {
        render(<DarkOverlay />);
        const darkOverlay = screen.getByTestId('overlay');

        expect(darkOverlay).toBeInTheDocument();
    });

    it('Renders the spinner if isLoading is true', () => {
        render(<DarkOverlay isLoading={true} />);
        const spinner = screen.getByLabelText('Loading Spinner');

        expect(spinner).toBeInTheDocument();
    });

    it('Does not render the spinner when is not loading', () => {
        render(<DarkOverlay isLoading={false} />);
        const spinner = screen.queryByLabelText('Loading Spinner');

        expect(spinner).not.toBeInTheDocument();
    });

    it('Triggers the click handler on overlay click', async () => {
        const onClickHandler = vi.fn();
        render(<DarkOverlay onClickHandler={onClickHandler} />);

        const darkOverlay = screen.getByTestId('overlay');
        await userEvent.click(darkOverlay);

        expect(onClickHandler).toBeCalledTimes(1);
    });

    it('Renders the Pulse Loader when "text" is provided', () => {
        render(<DarkOverlay text="Please wait..." />);
        const pulseLoader = screen.queryByLabelText('Pulse Loader');

        expect(pulseLoader).toBeInTheDocument();
    });
});
