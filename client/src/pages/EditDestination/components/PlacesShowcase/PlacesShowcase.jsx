import { useState } from 'react';
import { useDeletePlace } from '../../../../hooks/queries/useDeletePlace';
import { checkArrayAndPreloadElements } from '../../../../utils/utils';

// Components
import { Places } from '../../../../components/Places/Places';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { LinkButtonSecondary } from '../../../../components/Buttons/Secondary-Btn/LinkButtonSecondary';
import { ServerErrorPopUp } from '../../../../components/ServerErrorPopUp/ServerErrorPopUp';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';

import routeConstants from '../../../../constants/routeConstants';
import styles from './PlacesShowcase.module.css';

const { PLACES } = routeConstants;

export const PlacesShowcase = ({ places, destinationId, isLoading }) => {
    const [deletePlace, error, isDeleteLoading] = useDeletePlace(destinationId);
    const [openModal, setOpenModal] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);

    const onConfirmDeleteClickHandler = () => {
        deletePlace(placeToDelete, {
            onSuccess: () => setOpenModal(false),
            onError: () => setOpenModal(false),
        });
    };

    const onDeleteClickOpenConfirmModalHandler = (placeId) => {
        setOpenModal(true);
        setPlaceToDelete({ placeId });
    };

    const handleCloseConfirmModal = () => {
        if (isDeleteLoading) return;
        setOpenModal(false);
        setPlaceToDelete(null);
    };

    // If data is loading - it returns a new array with 3 elements
    // This ensures that there will be 3 div boxes for the loading skeleton when is loading
    const placesData = isLoading ? checkArrayAndPreloadElements([], 3) : places;
    const hasNoPlaces = placesData.length == 0;

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
                <TextWrap isLoading={isLoading} content={'Places'} />
            </h2>

            {hasNoPlaces && <p>No places have been added yet.</p>}

            <Places
                places={placesData}
                onDeleteClickHandler={onDeleteClickOpenConfirmModalHandler}
                isOwner={true}
                isLoading={isLoading}
            />

            {!isLoading && (
                <LinkButtonSecondary to={PLACES.ADD.routePath(destinationId)}>
                    {PLACES.ADD.name}
                </LinkButtonSecondary>
            )}

            {openModal && (
                <ConfirmModal
                    onCloseHandler={handleCloseConfirmModal}
                    actionClickHandler={onConfirmDeleteClickHandler}
                    isLoading={isDeleteLoading}
                >
                    Are you sure you wanna delete this place?
                </ConfirmModal>
            )}

            {error && <ServerErrorPopUp errorMessage={error} />}
        </section>
    );
};
