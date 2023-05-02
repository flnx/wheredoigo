import styles from './Form.module.css';

export const ShowError = ({ errors, errorParam }) => {
    const errorChecker = (name) => {
        name = name.toLowerCase();
        return errors.find((e) => e.toLowerCase().includes(name));
    };

    const hasError = errorChecker(errorParam);

    return hasError && <span className={styles.error}>{errorChecker(errorParam)}</span>;
};
