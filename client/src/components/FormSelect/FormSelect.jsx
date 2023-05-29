import { ShowFormError } from '../ShowFormError/ShowFormError';
import styles from './FormSelect.module.css';

export const FormSelect = ({ value, options, onChangeHandler, label, errors, boxshadow }) => {
    const name = label.toLowerCase();
    const optionsData = options.length > 0 ? options : ['-- No Data --'];

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
                {label !== 'Place' && <option value="">--Select {label}--</option>}
                {optionsData.map((option, i) => (
                    <option value={option} key={i}>
                        {option}
                    </option>
                ))}
            </select>
            {!value && <ShowFormError errors={errors} errorParam={name} />}
        </div>
    );
};
