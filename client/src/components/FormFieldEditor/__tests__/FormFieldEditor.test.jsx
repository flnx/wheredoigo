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
            isEditable: false,
            fieldId: 'fieldId',
            title: 'title',
            desc: 'description',
            error: '',
            sendEditedFieldClickHandler: vi.fn(),
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

        await waitFor(() => (props.isEditable = true));

        rerender(<MemoizedFormFieldEditor {...props} />);

        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('Shows the textarea with the correct description text when edit is clicked', async () => {
        const { rerender } = render(<MemoizedFormFieldEditor {...props} />);

        const edit = screen.getByText('Edit');
        expect(edit).toBeInTheDocument();

        userEvent.click(edit);

        await waitFor(() => {
            expect(props.onEditButtonClickHandler).toHaveBeenCalledTimes(1);
            props.isEditable = true;
        });

        rerender(<MemoizedFormFieldEditor {...props} />);
        const textarea = screen.getByRole('textbox', { name: props.title });
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveValue(props.desc);
    });

    it('Changes the text when typing', async () => {
        props.isEditable = true;
        render(<MemoizedFormFieldEditor {...props} />);

        const textarea = screen.getByRole('textbox', { name: props.title });

        userEvent.clear(textarea);
        userEvent.type(textarea, 'textarea testing');

        await waitFor(() => {
            expect(textarea).toHaveValue('textarea testing');
        });
    });

    it('Saves the text changes when save button is clicked', async () => {
        props.isEditable = true;
        const { rerender } = render(<MemoizedFormFieldEditor {...props} />);

        const textarea = screen.getByRole('textbox', { name: props.title });
        const saveBtn = screen.getByRole('button', { name: 'Save' });

        userEvent.clear(textarea);
        userEvent.type(textarea, 'textarea testing');

        await waitFor(() => {
            expect(textarea).toHaveValue('textarea testing');
        });

        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(props.sendEditedFieldClickHandler).toHaveBeenCalledTimes(1);
            props.desc = 'textarea testing';
            props.isEditable = false;
        });

        rerender(<MemoizedFormFieldEditor {...props} />);

        const description = screen.getByText(props.desc);
        expect(description).toBeInTheDocument();
    });

    it('Returns the initial text value on cancel button click', async () => {
        props.isEditable = true;
        const { rerender } = render(<MemoizedFormFieldEditor {...props} />);

        const textarea = screen.getByRole('textbox', { name: props.title });
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        userEvent.clear(textarea);
        userEvent.type(textarea, 'textarea testing');

        await waitFor(() => {
            // Add new text
            expect(textarea).toHaveValue('textarea testing');
        });

        // Clicks cancel button and checks if it resets the previous value (that is cached)
        userEvent.click(cancelBtn);

        await waitFor(() => {
            // Checks if the fieldId is passed in order to reset isEditable state and hide the textarea/input
            expect(props.onEditButtonClickHandler).toHaveBeenCalledWith(props.fieldId);

            // Checks if it sets the previous cached value back
            expect(textarea).toHaveValue(props.desc);
            expect(textarea).not.toHaveValue('textarea testing');
        });

        props.isEditable = false;
        rerender(<MemoizedFormFieldEditor {...props} />);

        const description = screen.getByText(props.desc);
        expect(description).toBeInTheDocument();
    });
});
