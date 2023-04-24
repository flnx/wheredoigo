import { memo, useState } from 'react';

// Components

import { Place } from '../../../../components/Place/Place';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

import styles from './Places.module.css';

const Places = ({ placesData, destinationId }) => {
    const [places, setPlace] = useState(placesData);
    const [openModal, setOpenModal] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);

    const onDeleteClickOpenConfirmModalHandler = (placeId) => {
        setOpenModal(true);
        setPlaceToDelete(placeId);
    };

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
        setPlaceToDelete(null);
    };

    return (
        <section>
            <h2 className={styles.sectionTitle}>Places</h2>

            <div className={styles['places-container']}>
                {places.map((place) => (
                    <Place place={place} key={place._id} onDeleteClickHandler={onDeleteClickOpenConfirmModalHandler}/>
                ))}
            </div>

            {openModal && (
                <ConfirmModal
                    onCloseHandler={handleCloseConfirmModal}
                    // actionClickHandler={}
                    isLoading={true}
                >
                    Are you sure you wanna delete this place?
                </ConfirmModal>
            )}
        </section>
    );
};

export const MemoizedPlaces = memo(Places);
