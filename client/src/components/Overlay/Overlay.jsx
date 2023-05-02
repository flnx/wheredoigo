import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { X } from '@phosphor-icons/react';
import styles from './Overlay.module.css';

export const Overlay = ({ children, closeModalHandler }) => {
    useEffect(() => {
        disableBodyScroll();

        return () => enableBodyScroll();
    }, []);

    return (
        <>
            <div className={styles.overlay} onClick={closeModalHandler} />
            <div className={styles.wrapper}>
                <X
                    size={32}
                    onClick={closeModalHandler}
                    className={styles.closeIcon}
                />
                {children}
            </div>
        </>
    );
};
