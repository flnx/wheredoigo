import { memo, useEffect, useState } from 'react';
import { useDeletePlace } from '../../../../hooks/queries/useDeletePlace';
import { useNavigate } from 'react-router-dom';

// Components
import { Place } from '../../../../components/Place/Place';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';

import styles from './PlacesShowcase.module.css';

export const PlacesShowcase = ({ places, destinationId }) => {
    const [deletePlace, error, isLoading] = useDeletePlace(destinationId);
    const [openModal, setOpenModal] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);
    const navigate = useNavigate();

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

    const onAddPlaceClickHandler = () => {
        navigate(`/destinations/${destinationId}/places/add`);
    };

    const onEditClickHandler = (placeId) => {
        navigate(`/places/${placeId}/edit`);
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
                        key={place._id}
                        onDeleteClickHandler={onDeleteClickOpenConfirmModalHandler}
                        onClickHandler={onEditClickHandler}
                    />
                ))}
            </div>

            <SecondaryButton clickHandler={onAddPlaceClickHandler}>Add Places</SecondaryButton>

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
