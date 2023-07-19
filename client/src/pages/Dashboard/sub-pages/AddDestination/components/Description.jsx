import { ShowFormError } from '../../../../../components/ShowFormError/ShowFormError';
import { TipTap } from '../../../../../components/TipTap/TipTap';

export const Description = ({ updateDescription, errors, charCounter }) => {
    const onChangeHandler = (content, charCounter) => {
        updateDescription(content, charCounter);
    };

    const hasError = errors.some((msg) => msg.includes('Description'));
    const style = {
        position: 'relative',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
    };

    return (
        <div style={style}>
            <h3>Description</h3>
            <TipTap onChangeHandler={onChangeHandler} />

            {hasError && charCounter < 50 && (
                <ShowFormError errors={errors} errorParam={'Description'} />
            )}
        </div>
    );
};
