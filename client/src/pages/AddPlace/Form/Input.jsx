import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import styles from './Form.module.css';

export const Input = ({ name, onChangeHandler, errors }) => {
    return (
        <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="name">
                Name:
            </label>
            <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={onChangeHandler}
                className={styles.formInput}
                placeholder="Add place name"
            />
            <ShowFormError errors={errors} errorParam={'name'} />
        </div>
    );
};
