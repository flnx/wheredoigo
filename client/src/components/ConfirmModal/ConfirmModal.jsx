import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';

// Components
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { CancelButton } from '../Buttons/Cancel-Button/CancelButton';
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

import styles from './ConfirmModal.module.css';

export const ConfirmModal = ({ children, onCloseHandler, actionClickHandler, isLoading }) => {
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    return (
        <>
            <DarkOverlay onClickHandler={onCloseHandler} isLoading={isLoading} />
            <div className={styles.modalMain}>
                {children}
                <div className={styles.modalButtons}>
                    <SuccessButton onClickHandler={actionClickHandler} isLoading={isLoading}>
                        Delete
                    </SuccessButton>
                    <CancelButton onClickHandler={onCloseHandler} isLoading={isLoading}>
                        Cancel
                    </CancelButton>
                </div>
            </div>
        </>
    );
};
