import styles from './FormEditWrapper.module.css';

export const FormEditWrapper = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export const WrapperWithWidth = ({ children }) => {
    return <div className={styles.wrapperWithWidth}>{children}</div>;
};

export const EditButtonsWrapper = ({ children }) => {
    return <div className={styles.buttons}>{children}</div>;
};
