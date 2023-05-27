import { ShowFormError } from '../../../../../components/ShowFormError/ShowFormError';
import styles from '../AddDestination.module.css';

export const Description = ({ updateField, description, errors }) => {
    const onChangeHandler = (e) => {
        updateField(e.target.name, e.target.value);
    };

    const hasError = errors.some((msg) => msg.includes('Description'));
    const validField = `${description.length >= 50 ? styles.validField : ''}`;
    const invalidField = `${hasError && description.length < 50 ? styles.error : ''}`;

    return (
        <div className={styles.formField}>
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                rows="8"
                name="description"
                placeholder="Add a description"
                value={description}
                onChange={onChangeHandler}
                className={`${validField} ${invalidField}`}
            />

            {invalidField && <ShowFormError errors={errors} errorParam={'Description'} />}
        </div>
    );
};
