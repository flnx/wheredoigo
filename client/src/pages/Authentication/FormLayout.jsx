import styles from './FormLayout.module.css';

export const FormLayout = ({ page: Page }) => {
    return (
        <div className={styles.container}>
            <div className={styles.aside} />
            <div className={styles.wrapper}>
                <Page />
            </div>
        </div>
    );
};
