import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import styles from './Form.module.css';

export const Textarea = ({ description, onChangeHandler, errors }) => {
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
            <ShowFormError errors={errors} errorParam={'description'} />
        </div>
    );
};
