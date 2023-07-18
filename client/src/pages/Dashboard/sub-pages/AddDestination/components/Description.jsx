import { ShowFormError } from '../../../../../components/ShowFormError/ShowFormError';
import { TipTap } from '../../../../../components/TipTap/TipTap';
import styles from '../AddDestination.module.css';

export const Description = ({ updateDescription, errors, charCounter }) => {
    const onChangeHandler = (content, charCounter) => {
        updateDescription(content, charCounter);
    };

    const hasError = errors.some((msg) => msg.includes('Description'));

    return (
        <div
            className={styles.formField}
            style={{ backgroundColor: '#fff', padding: 0, boxShadow: 'none' }}
        >
            <h3>Description</h3>
            <TipTap onChangeHandler={onChangeHandler} />

            {hasError && charCounter < 50 && (
                <ShowFormError errors={errors} errorParam={'Description'} />
            )}
        </div>
    );
};
