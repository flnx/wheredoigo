import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatorDestinations } from '../../../../hooks/queries/useCreatorDestinations';
import { useDeleteDestination } from '../../../../hooks/queries/useDeleteDestination';

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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        if (error?.response?.status === 404) {
            return <p>You haven't added any destinations yet.</p>;
        }

        return <h1>An Error Has Occured</h1>;
    }

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
            onSuccess: (result) => {
                setOpenConfirmModal(false);
            }, 
            onError: (err) => {
                setOpenConfirmModal(false);
            }
        });
    };

    const onEditHandler = (destinationId) => {
        navigate('/destination/edit', { state: destinationId });
    };

    return (
        <>
            <h2 className={styles.title}>Highest rated destinations:</h2>
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
        </>
    );
};
