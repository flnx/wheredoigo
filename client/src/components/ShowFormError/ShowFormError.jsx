import styles from './ShowFormError.module.css';
import PropTypes from 'prop-types';

const propTypes = {
    errors: PropTypes.array.isRequired,
    errorParam: PropTypes.string.isRequired,
};

export const ShowFormError = ({ errors, errorParam }) => {
    const errorChecker = (name) => {
        name = name.toLowerCase();
        return errors.find((e) => e.toLowerCase().includes(name));
    };

    const hasError = errorChecker(errorParam);

    return hasError ? <span className={styles.error}>{errorChecker(errorParam)}</span> : null;
};

ShowFormError.propTypes = propTypes;
