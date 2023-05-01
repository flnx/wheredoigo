import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatorDestinations } from '../../../../hooks/queries/useCreatorDestinations';
import { useDeleteDestination } from '../../../../hooks/queries/useDeleteDestination';
import { extractServerErrorMessage } from '../../../../utils/utils';

// Components
import { Destination } from '../../../../components/Destination/Destination';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

import styles from './OwnerDestinations.module.css';

export const OwnerDestinations = () => {
    const { data, isLoading, error } = useCreatorDestinations();
    const [deleteDestination, deleteError, isDeleteLoading] = useDeleteDestination();
    const [destinationToDelete, setDestinationToDelete] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const navigate = useNavigate();

    const openConfirmModalHandler = (destinationId) => {
        setOpenConfirmModal(true);
        setDestinationToDelete(destinationId);
    };

    const onConfirmCancelHandler = () => {
        setOpenConfirmModal(false);
        setDestinationToDelete(null);
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

    const onEditHandler = (destinationId) => {
        navigate(`/destinations/${destinationId}/edit`);
    };

    if (error) {
        const errorMessage = extractServerErrorMessage(error);
        return errorMessage;
    }

    return isLoading ? (
        <h2>Loading....</h2>
    ) : (
        <div className={styles.container}>
            <h2 className={styles.title}>My stuff 🦖</h2>
            <div className={styles.wrapper}>
                {data.map((destination) => (
                    <Destination
                        destination={destination}
                        key={destination._id}
                        onClickHandler={onEditHandler}
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
        </div>
    );
};
