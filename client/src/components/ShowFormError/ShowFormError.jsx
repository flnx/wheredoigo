import styles from './ShowFormError.module.css';
import PropTypes from 'prop-types';

const propTypes = {
    errors: PropTypes.array,
    errorParam: PropTypes.string,
};

export const ShowFormError = ({ errors, errorParam }) => {
    if (errors.length == 0 || !errorParam) {
        return null;
    }

    const errorChecker = (name) => {
        name = name.toLowerCase();
        return errors.find((e) => e.toLowerCase().includes(name));
    };

    const hasError = errorChecker(errorParam);

    return hasError ? (
        <span className={styles.error}>{errorChecker(errorParam)}</span>
    ) : null;
};

ShowFormError.propTypes = propTypes;
