import { useState } from 'react';
import { useDeletePlace } from '../../../../hooks/queries/useDeletePlace';

// Components
import { Places } from '../../../../components/Places/Places';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { LinkButtonSecondary } from '../../../../components/Buttons/Secondary-Btn/LinkButtonSecondary';

import routeConstants from '../../../../constants/routeConstants';
import styles from './PlacesShowcase.module.css';

const { PLACES } = routeConstants;

export const PlacesShowcase = ({ places, destinationId }) => {
    const [deletePlace, error, isLoading] = useDeletePlace(destinationId);
    const [openModal, setOpenModal] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);

    const onConfirmDeleteClickHandler = () => {
        deletePlace(placeToDelete, {
            onSuccess: () => setOpenModal(false),
        });
    };

    const onDeleteClickOpenConfirmModalHandler = (placeId) => {
        setOpenModal(true);
        setPlaceToDelete({ placeId });
    };

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
        setPlaceToDelete(null);
    };

    const hasPlaces = places.length != 0;

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Places</h2>

            {!hasPlaces && <p>No places have been added yet.</p>}

            <Places
                places={places}
                onDeleteClickHandler={onDeleteClickOpenConfirmModalHandler}
                isOwner={true}
            />

            <LinkButtonSecondary to={PLACES.ADD.routePath(destinationId)}>
                {PLACES.ADD.name}
            </LinkButtonSecondary>

            {openModal && (
                <ConfirmModal
                    onCloseHandler={handleCloseConfirmModal}
                    actionClickHandler={onConfirmDeleteClickHandler}
                    isLoading={isLoading}
                >
                    Are you sure you wanna delete this place?
                </ConfirmModal>
            )}
        </section>
    );
};
