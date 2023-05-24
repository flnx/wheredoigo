import { useState } from 'react';
import { useCreatorDestinations } from '../../../../hooks/queries/useCreatorDestinations';
import { useDeleteDestination } from '../../../../hooks/queries/useDeleteDestination';
import { extractServerErrorMessage } from '../../../../utils/utils';

// Components
import { Destination } from './components/Destination';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { ClipLoader } from 'react-spinners';

import styles from './OwnerDestinations.module.css';

export const OwnerDestinations = () => {
    const { data, isLoading, error } = useCreatorDestinations();
    const [deleteDestination, deleteError, isDeleteLoading] = useDeleteDestination();
    const [destinationToDelete, setDestinationToDelete] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const openConfirmModalHandler = (destinationId) => {
        setOpenConfirmModal(true);
        setDestinationToDelete(destinationId);
    };

    const onConfirmCancelHandler = () => {
        if (!isDeleteLoading) {
            setOpenConfirmModal(false);
            setDestinationToDelete(null);
        }
    };

    const onDeleteConfirmHandler = () => {
        deleteDestination(destinationToDelete, {
            onSuccess: () => {
                setOpenConfirmModal(false);
            },

            onError: () => {
                setOpenConfirmModal(false);
            },
        });
    };
    
    const serverError = error ? error : deleteError;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My stuff 🦖</h2>
            <div className={styles.wrapper}>
                {serverError && extractServerErrorMessage(serverError)}
                {data?.map((destination) => (
                    <Destination
                        destination={destination}
                        key={destination._id}
                        onDeleteClickHandler={openConfirmModalHandler}
                    />
                ))}
            </div>
            {openConfirmModal && (
                <ConfirmModal
                    onCloseHandler={onConfirmCancelHandler}
                    actionClickHandler={onDeleteConfirmHandler}
                    isLoading={isDeleteLoading}
                >
                    Are you sure you wanna delete this destination?
                </ConfirmModal>
            )}
            <ClipLoader
                color="#36d7b7"
                size={40}
                loading={isLoading || isDeleteLoading}
                aria-label="Loading Spinner"
                className={styles.spinner}
            />
        </div>
    );
};
