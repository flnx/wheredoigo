import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { FormSelect } from '../FormSelect';

describe('FormSelect Tests', () => {
    const props = {
        value: '',
        options: ['Sofia', 'Plovdiv', 'Varna'],
        onChangeHandler: vi.fn(),
        label: 'Label',
        errors: [],
    };

    beforeEach(() => {
        props.onChangeHandler = vi.fn();
    });

    it('Should correctly show the label and set the default option and contain all options', () => {
        render(<FormSelect {...props} />);

        const label = screen.getByLabelText('label');
        expect(label).toHaveTextContent(props.label);

        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('');

        // Verify the options
        const selectOptions = screen.getAllByRole('option');
        expect(selectOptions).toHaveLength(props.options.length + 1);

        props.options.forEach((option, index) => {
            expect(selectOptions[index + 1]).toHaveValue(option);
            expect(selectOptions[index + 1]).toHaveTextContent(option);
        });
    });

    it('Should select the correct option', async () => {
        const { rerender } = render(<FormSelect {...props} />);

        // This Component relies complitely on a parent compponent state
        // This is why I can't simulate a real rerender while using userEvent
        // So I just check if the handler is being called
        // I could use toHaveBeenCalledWith to check the prop name but I pass the whole "e" to the parent so its not possible
        // [] I could reform my code to be cleaner and easier to test but maybe in the future...

        let dropdown = screen.getByRole('combobox');
        expect(dropdown).toHaveValue(''); // Initial selected value

        const optionToSelect = props.options[2]; // Varna

        await userEvent.selectOptions(dropdown, optionToSelect);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
        props.value = optionToSelect;

        rerender(<FormSelect {...props} />);
        expect(screen.getByRole('option', { name: optionToSelect }).selected).toBe(true);
    });
});
