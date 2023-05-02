import { useState } from 'react';
import { useDeletePlace } from '../../../../hooks/queries/useDeletePlace';

// Components
import { Place } from '../../../../components/Place/Place';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { LinkButtonSecondary } from '../../../../components/Buttons/Secondary-Btn/LinkButtonSecondary';

import styles from './PlacesShowcase.module.css';

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

            <div className={styles['places-container']}>
                {places.map((place) => (
                    <Place
                        place={place}
                        onDeleteClickHandler={onDeleteClickOpenConfirmModalHandler}
                        key={place._id}
                    />
                ))}
            </div>

            <LinkButtonSecondary to={`/destinations/${destinationId}/places/add`}>
                Add Places
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
