import styles from '../FormLayout.module.css';

export const FormLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.aside} />
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};