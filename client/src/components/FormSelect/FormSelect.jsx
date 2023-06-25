import PropTypes from 'prop-types';
import { ShowFormError } from '../ShowFormError/ShowFormError';
import { ClipLoader } from 'react-spinners';

import styles from './FormSelect.module.css';

const propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.array,
    boxshadow: PropTypes.bool,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
};

export const FormSelect = ({
    value,
    options,
    onChangeHandler,
    label,
    errors,
    boxshadow,
    disabled,
    isLoading = false,
}) => {
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
                onChange={onChangeHandler}
                className={styles.select}
                disabled={disabled}
            >
                {label !== 'Place' && <option value="">--Select {label}--</option>}
                {optionsData.map((option, i) => (
                    <option value={option} key={i}>
                        {option}
                    </option>
                ))}
            </select>
            <ClipLoader
                color="#36d7b7"
                size={18}
                loading={isLoading}
                aria-label="Loading Spinner"
                className={styles.spinner}
            />
            {!value && <ShowFormError errors={errors} errorParam={name} />}
        </div>
    );
};

FormSelect.propTypes = propTypes;
