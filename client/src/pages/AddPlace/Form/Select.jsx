import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import styles from './Form.module.css';

export const Select = ({ onChangeHandler, categories, type, errors }) => {
    return (
        <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="type">
                Type:
            </label>
            <select
                id="type"
                name="type"
                value={type}
                onChange={onChangeHandler}
                className={styles.formSelect}
            >
                <option value="">--Select Category--</option>
                {categories.map((category, i) => (
                    <option value={category} key={i}>
                        {category}
                    </option>
                ))}
            </select>
            <ShowFormError errors={errors} errorParam={'category'} />
            <ShowFormError errors={errors} errorParam={'all'} />
        </div>
    );
};
