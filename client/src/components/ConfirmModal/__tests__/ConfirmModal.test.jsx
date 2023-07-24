import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent } from 'src/utils/test-utils';
import { ConfirmModal } from '../ConfirmModal';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('ConfirmModal tests', () => {
    let onCloseHandler;
    let actionClickHandler;

    beforeEach(() => {
        onCloseHandler = vi.fn();
        actionClickHandler = vi.fn();
    });

    it('Renders the component with the given text and overlay', () => {
        render(
            <ConfirmModal
                onCloseHandler={onCloseHandler}
                actionClickHandler={actionClickHandler}
                isLoading={false}
            >
                Are you sure you want to delete test?
            </ConfirmModal>
        );
        const darkOverlay = screen.getByTestId('overlay');
        const confirmModal = screen.getByText('Are you sure you want to delete test?');

        expect(darkOverlay).toBeInTheDocument();
        expect(confirmModal).toBeInTheDocument();
    });

    it('Renders the component with the correct buttons', () => {
        render(
            <ConfirmModal
                onCloseHandler={onCloseHandler}
                actionClickHandler={actionClickHandler}
                isLoading={false}
            >
                Are you sure you want to delete test?
            </ConfirmModal>
        );

        const deleteBtn = screen.getByRole('button', { name: 'Delete' });
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        expect(deleteBtn).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();
    });

    it('Checks if the close handler passed from the parent is being triggered', async () => {
        render(
            <ConfirmModal
                onCloseHandler={onCloseHandler}
                actionClickHandler={actionClickHandler}
                isLoading={false}
            >
                Are you sure you want to delete test?
            </ConfirmModal>
        );

        const darkOverlay = screen.getByTestId('overlay');
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        // Checks if the close handler works
        await userEvent.click(darkOverlay);
        await userEvent.click(cancelBtn);

        expect(onCloseHandler).toHaveBeenCalledTimes(2);
    });

    it('Checks if the action click handler passed from the parent is being triggered', async () => {
        render(
            <ConfirmModal
                onCloseHandler={onCloseHandler}
                actionClickHandler={actionClickHandler}
                isLoading={false}
            >
                Are you sure you want to delete test?
            </ConfirmModal>
        );

        const deleteBtn = screen.getByRole('button', { name: 'Delete' });
        await userEvent.click(deleteBtn);

        expect(actionClickHandler).toHaveBeenCalledTimes(1);
    });

    it('Disables the buttons when loading', async () => {
        render(
            <ConfirmModal
                onCloseHandler={onCloseHandler}
                actionClickHandler={actionClickHandler}
                isLoading={true}
            >
                Are you sure you want to delete test?
            </ConfirmModal>
        );

        const deleteBtn = screen.getByRole('button', { name: 'Delete' });
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        expect(deleteBtn).toBeDisabled();
        expect(cancelBtn).toBeDisabled();
    });
});
