import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';
import styles from './Form.module.css';

export const Textarea = ({ description, onChangeHandler, errors }) => {
    const isNotValid = description.length < 50 || description.length > 5000;

    return (
        <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="description">
                Description:
            </label>
            <textarea
                id="description"
                name="description"
                rows="8"
                value={description}
                onChange={onChangeHandler}
                className={styles.formInput}
                placeholder="Add place description..."
            />
            {isNotValid && <ShowFormError errors={errors} errorParam={'description'} />}
        </div>
    );
};
