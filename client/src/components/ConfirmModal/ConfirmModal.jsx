import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import styles from './ConfirmModal.module.css';
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { CancelButton } from '../Buttons/Cancel-Button/CancelButton';

export const ConfirmModal = ({ children, onCloseHandler, actionClickHandler }) => {
    useEffect(() => {
        disableBodyScroll();

        return () => enableBodyScroll();
    }, []);

    return (
        <>
            <div className={styles.overlay} onClick={onCloseHandler}></div>
            <div className={styles.modal}>
                <div className={styles.modalMain}>
                    {children}
                    <div className={styles.modalButtons}>
                        <SuccessButton onClickHandler={actionClickHandler}>Delete</SuccessButton>
                        <CancelButton onClickHandler={onCloseHandler}>Cancel</CancelButton>
                    </div>
                </div>
            </div>
        </>
    );
};