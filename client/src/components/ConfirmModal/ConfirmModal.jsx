import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';

// Components
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { CancelButton } from '../Buttons/Cancel-Button/CancelButton';

import styles from './ConfirmModal.module.css';

export const ConfirmModal = ({ children, onCloseHandler, actionClickHandler, isLoading }) => {
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
                        <SuccessButton onClickHandler={actionClickHandler} isLoading={isLoading}>
                            Delete
                        </SuccessButton>
                        <CancelButton onClickHandler={onCloseHandler}>
                            Cancel
                        </CancelButton>
                    </div>
                </div>
            </div>
        </>
    );
};
