import { X } from 'phosphor-react';
import styles from './Overlay.module.css';

export const Overlay = ({ children, closeModalHandler }) => {
    return (
        <>
            <div className={styles.overlay} onClick={closeModalHandler} />
            <div className={styles.wrapper}>
                <X
                    size={32}
                    weight="duotone"
                    onClick={closeModalHandler}
                    className={styles.closeIcon}
                />
                {children}
            </div>
        </>
    );
};
