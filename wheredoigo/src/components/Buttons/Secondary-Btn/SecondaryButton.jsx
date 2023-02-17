import styles from './SecondaryButton.module.css';

export const SecondaryButton = ({ children: text }) => {
    return (
        <button className={styles.btn}>
            {text}
        </button>
        );
};