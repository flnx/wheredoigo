import styles from './PrimaryButton.module.css';

export const PrimaryButton = ({ children: text }) => {
    return <button className={styles.primary}>{text}</button>;
};
