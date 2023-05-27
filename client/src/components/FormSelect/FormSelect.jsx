import { ShowFormError } from '../ShowFormError/ShowFormError';
import styles from './FormSelect.module.css';

export const FormSelect = ({ value, options, onChangeHandler, label, errors, boxshadow }) => {
    const name = label.toLowerCase();

    return (
        <div className={`${styles.selectWrapper} ${boxshadow ? styles.boxShadow : ''}`}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChangeHandler}
                className={styles.select}
            >
                <option value="">--Select {label}--</option>
                {options.map((option, i) => (
                    <option value={option} key={i}>
                        {option}
                    </option>
                ))}
            </select>
            {!value && <ShowFormError errors={errors} errorParam={name} />}
        </div>
    );
};
