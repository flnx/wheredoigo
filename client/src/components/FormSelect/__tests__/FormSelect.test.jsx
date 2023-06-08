import { render as customRender, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { FormSelect } from '../FormSelect';

const render = (Component) => {
    return customRender(<>{Component}</>);
};

describe('FormFieldEditor Tests', () => {
    let props;
    let onChangeHandler;

    beforeEach(() => {
        onChangeHandler = vi.fn();

        props = {
            value: 'initial option',
            options: ['option1', 'option2', 'option3'],
            onChangeHandler,
            label: 'Label',
        };
    });

    it('Should correctly show the label and set the default option', () => {
        render(<FormSelect {...props} />);

        const label = screen.getByLabelText('label');
        expect(label).toHaveTextContent(props.label);

        const option = screen.getByRole('option', { name: `--Select ${props.label}--` });
        expect(option.selected).toBeTruthy();
    });
});
