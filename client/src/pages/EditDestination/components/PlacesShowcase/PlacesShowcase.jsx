import { useState } from 'react';

// React Query Hooks
import { useDeletePlace } from 'src/hooks/queries/useDeletePlace';

// Utils
import { checkArrayAndPreloadElements } from 'src/utils/utils';

// Global Components
import { Places } from 'src/components/Places/Places';
import { ConfirmModal } from 'src/components/ConfirmModal/ConfirmModal';
import { LinkButtonSecondary } from 'src/components/Buttons/Secondary-Btn/LinkButtonSecondary';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';
import { TextWrap } from 'src/components/TextWrap/TextWrap';

import routeConstants from 'src/constants/routeConstants';
import styles from './PlacesShowcase.module.css';

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
    const { PLACES } = routeConstants;

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
                <>
                    <div
                        style={{
                            margin: '2rem 0 2rem 0',
                        }}
                    ></div>
                    <LinkButtonSecondary to={PLACES.ADD.routePath(destinationId)}>
                        {PLACES.ADD.name}
                    </LinkButtonSecondary>
                </>
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
