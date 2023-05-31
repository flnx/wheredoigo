import { useContext, useState } from 'react';
import { useDeleteAccount } from '../../../../hooks/queries/useDeleteAccount';
import { AuthContext } from '../../../../context/AuthContext';

// Components
import { WarningButton } from '../../../../components/Buttons/Button-Warning/WarningButton';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { ServerError } from '../../../../components/ServerError/ServerError';

import styles from './UserSettings.module.css';

export const UserSettings = () => {
    const [deleteAccount, error, isLoading] = useDeleteAccount();
    const [showModal, setShowModal] = useState(false);
    const { auth, setUserData } = useContext(AuthContext);

    const onConfirmedDeleteHandler = () => {
        deleteAccount(null, {
            onSuccess: () => {
                setShowModal(false);
                setUserData({});
            },
            onError: () => {
                setShowModal(false);
            },
        });
    };

    const onCloseModalHandler = () => {
        if (isLoading) return;
        setShowModal(false);
    };

    const onDeleteButtonClickHandler = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.container}>
            <h1 className="smaller mb-2">Account</h1>

            <section>
                <h2 className={styles.username}>{auth.username}</h2>
                <p className={styles.email}>{auth.email}</p>
                <WarningButton
                    onClickHandler={onDeleteButtonClickHandler}
                    isLoading={isLoading}
                >
                    Delete account
                </WarningButton>
            </section>
            {showModal && (
                <ConfirmModal
                    onCloseHandler={onCloseModalHandler}
                    actionClickHandler={onConfirmedDeleteHandler}
                    isLoading={isLoading}
                >
                    <div className={styles.confirmation}>
                        <h3>Delete your account</h3>
                        <p>Are you sure you want to delete your account?</p>
                    </div>
                </ConfirmModal>
            )}
            {error && <ServerError errorMessage={error}/>}
        </div>
    );
};
