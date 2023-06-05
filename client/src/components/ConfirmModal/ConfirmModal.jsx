import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';

// Components
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { CancelButton } from '../Buttons/Cancel-Button/CancelButton';
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

import styles from './ConfirmModal.module.css';

const propTypes = {
    onCloseHandler: PropTypes.func.isRequired,
    actionClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

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
                <div className={styles.modalButtons} data-testid="modal">
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

ConfirmModal.propTypes = propTypes;
