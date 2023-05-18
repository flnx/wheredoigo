import { ShowFormError } from '../../../../../components/ShowFormError/ShowFormError';
import styles from '../AddDestination.module.css';

export const Description = ({ dispatchHandler, description, errorMessages }) => {
    const onChangeHandler = (e) => {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const hasError = errorMessages.some((msg) => msg.includes('Description'));
    const validField = `${description.length >= 10 ? styles.validField : ''}`;
    const invalidField = `${hasError && description.length < 10 ? styles.error : ''}`;

    return (
        <div className={styles.formField}>
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                rows="8"
                name="description"
                placeholder="Add a description (at least 10 characters long)"
                value={description}
                onChange={onChangeHandler}
                className={`${validField} ${invalidField}`}
            />

            {invalidField && (
                <ShowFormError errors={errorMessages} errorParam={'Description'} />
            )}
        </div>
    );
};
