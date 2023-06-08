import PropTypes from 'prop-types';
import { ShowFormError } from '../ShowFormError/ShowFormError';

import styles from './FormSelect.module.css';

const propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.array,
    boxshadow: PropTypes.bool,
};

export const FormSelect = ({ value, options, onChangeHandler, label, errors, boxshadow }) => {
    const name = label.toLowerCase();
    const optionsData = options.length > 0 ? options : ['-- No Data --'];

    return (
        <div className={`${styles.selectWrapper} ${boxshadow ? styles.boxShadow : ''}`}>
            <label className={styles.label} htmlFor={name} aria-label="label">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={() => onChangeHandler(value)}
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

FormSelect.propTypes = propTypes;
