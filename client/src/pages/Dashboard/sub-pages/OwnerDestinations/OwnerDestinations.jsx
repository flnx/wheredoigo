import { useState } from 'react';

// React Query Hooks
import { useCreatorDestinations } from 'src/hooks/queries/useCreatorDestinations';
import { useDeleteDestination } from 'src/hooks/queries/useDeleteDestination';

// Utils
import { extractServerErrorMessage } from 'src/utils/utils';

// Global Components
import { ClipLoader } from 'react-spinners';
import { DestinationsGrid } from 'src/components/DestinationsGrid/DestinationsGrid';
import { ConfirmModal } from 'src/components/ConfirmModal/ConfirmModal';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';

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

    return (
        <div className={styles.container}>
            <h1 className="smaller mb-2">Created destinations</h1>
            {deleteError && <ServerErrorPopUp errorMessage={deleteError} />}
            {error ? (
                <>
                    <ServerErrorPopUp errorMessage={error} />
                    <span className={'server-error'}>{extractServerErrorMessage(error)}</span>
                </>
            ) : (
                <>
                    {data?.length > 0 ? (
                        <DestinationsGrid
                            destinations={data || []}
                            isEditable={true}
                            onDeleteClickHandler={openConfirmModalHandler}
                        />
                    ) : (
                        <p>No destinations have been added yet 🦖</p>
                    )}
                </>
            )}
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
                loading={isLoading}
                aria-label="Loading Spinner"
                className={styles.spinner}
            />
        </div>
    );
};
