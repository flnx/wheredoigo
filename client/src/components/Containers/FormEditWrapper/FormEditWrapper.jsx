import styles from './FormEditWrapper.module.css';

export const FormEditWrapper = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export const WrapperWithWidth = ({ children }) => {
    return <div style={{ width: '100%' }}>{children}</div>;
};

export const EditButtonsWrapper = ({ children }) => {
    return <div className={styles.buttons}>{children}</div>;
};
