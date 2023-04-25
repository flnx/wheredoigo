import { memo, useState } from 'react';
import { useDeletePlace } from '../../../../hooks/queries/useDeletePlace';

// Components

import { Place } from '../../../../components/Place/Place';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

import styles from './Places.module.css';
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';

const EditPlaces = ({ placesData, destinationId, queryParam }) => {
    const [deletePlace, error, isLoading] = useDeletePlace(destinationId, queryParam);
    const [places, setPlace] = useState(placesData);
    const [openModal, setOpenModal] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);

    const onConfirmDeleteClickHandler = () => {
        deletePlace(placeToDelete, {
            onSuccess: () => {
                setPlace((prevState) => {
                    const deleted_id = placeToDelete.placeId;
                    return prevState.filter((x) => x._id !== deleted_id);
                });
                setOpenModal(false);
            },
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
        console.log('hi');
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
                    />
                ))}
            </div>

            <SecondaryButton clickHandler={onAddPlaceClickHandler}>
                Add Places
            </SecondaryButton>

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

export const MemoizedEditPlaces = memo(EditPlaces);
