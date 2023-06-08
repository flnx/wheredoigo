import { MemoryRouter } from 'react-router-dom';

import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { MemoizedFormFieldEditor } from '../FormFieldEditor';

const render = (Component) => {
    return customRender(<MemoryRouter>{Component}</MemoryRouter>);
};

describe('ConfirmModal tests', () => {
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

    it('Shows the textarea with the correct description text when edit is clicked', async () => {
        const { rerender } = render(<MemoizedFormFieldEditor {...props} />);

        const edit = screen.getByText('Edit');
        expect(edit).toBeInTheDocument();

        userEvent.click(edit);

        await waitFor(() => {
            expect(props.onEditButtonClickHandler).toBeCalledTimes(1);
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
});
