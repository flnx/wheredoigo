import { useState } from 'react';

// Components
import { WarningButton } from '../../../../components/Buttons/Button-Warning/WarningButton';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

import styles from './UserSettings.module.css';

export const UserSettings = () => {
    const [showModal, setShowModal] = useState(false);

    const onConfirmedDeleteHandler = () => {
        setShowModal(false);
    };

    const onCloseModalHandler = () => {
        setShowModal(false);
    };

    const onDeleteButtonClickHandler = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.container}>
            <h1 className="smaller">Account</h1>

            <section>
                <h2 className={styles.username}>John</h2>
                <p className={styles.email}>john.wick@abv.bg</p>
                <WarningButton onClickHandler={onDeleteButtonClickHandler}>
                    Delete account
                </WarningButton>
            </section>
            {showModal && (
                <ConfirmModal
                    onCloseHandler={onCloseModalHandler}
                    actionClickHandler={onConfirmedDeleteHandler}
                >
                    <div className={styles.confirmation}>
                        <h3>Delete your account</h3>
                        <p>Are you sure you want to delete your account?</p>
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
