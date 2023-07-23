import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { MemoizedFormFieldEditor } from '../FormFieldEditor';

const render = (Component) => {
    return customRender(<>{Component}</>);
};

describe('FormFieldEditor Tests', () => {
    let props;

    beforeEach(() => {
        props = {
            categoryId: 'categoryId',
            isEditToggled: false,
            fieldId: 'fieldId',
            title: 'title',
            desc: 'description',
            error: '',
            submitHandler: vi.fn(),
            onEditButtonClickHandler: vi.fn(),
            isLoading: false,
        };
    });

    it('Renders with the correct description', () => {
        render(<MemoizedFormFieldEditor {...props} />);

        const description = screen.getByText(props.desc);
        const edit = screen.getByText('Edit');
        expect(description).toBeInTheDocument();
        expect(edit).toBeInTheDocument();
    });

    it('Renders the Save/Cancel buttons when edit is clicked', async () => {
        const { rerender } = render(<MemoizedFormFieldEditor {...props} />);

        const edit = screen.getByText('Edit');
        userEvent.click(edit);

        await waitFor(() => (props.isEditToggled = true));

        rerender(<MemoizedFormFieldEditor {...props} />);

        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('Shows TipTap editor when edit button is clicked with the corrext text', async () => {
        const { rerender } = render(<MemoizedFormFieldEditor {...props} />);

        const edit = screen.getByText('Edit');
        expect(edit).toBeInTheDocument();

        userEvent.click(edit);

        await waitFor(() => {
            expect(props.onEditButtonClickHandler).toHaveBeenCalledTimes(1);
            props.isEditToggled = true;
        });

        rerender(<MemoizedFormFieldEditor {...props} />);
        const editor = screen.getByTestId('editor');
        const text = screen.getByText(props.desc);

        expect(text).toBeInTheDocument();
        expect(editor).toBeInTheDocument();
    });

    it('Saves the text changes when save button is clicked', async () => {
        props.isEditToggled = true;
        render(<MemoizedFormFieldEditor {...props} />);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        await userEvent.click(saveBtn);

        expect(props.submitHandler).toHaveBeenCalledTimes(1);
    });

    it('Returns the initial text value on cancel button click', async () => {
        props.isEditToggled = true;
        render(<MemoizedFormFieldEditor {...props} />);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        await userEvent.click(cancelBtn);
        expect(props.onEditButtonClickHandler).toHaveBeenCalledWith(props.fieldId);
    });
});
