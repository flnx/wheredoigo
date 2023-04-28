import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDestinationToEdit } from '../../hooks/queries/useGetDestinationToEdit';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { MemoizedEditImages } from './components/EditImages/EditImages';
import { MemoizedPlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Form } from './components/Form/Form';

import { useDeleteDestinationImage } from '../../hooks/queries/useDeleteDestinationImage';

import styles from './EditDestination.module.css';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);
    const [deleteImage, deleteImgError, isDeleteImgLoading] = useDeleteDestinationImage(destinationId);

    const deleteImageHandler = useCallback((imgId, cbSetImages) => {
        deleteImage(imgId, {
            onSuccess: () => cbSetImages(),
        });
    }, []);

    if (error) return <h1>{extractServerErrorMessage(error)}</h1>;

    return (
        <div className="container">
            {isLoading || !data ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className={styles.destinationTitle}>
                        Edit {`${data?.city}, ${data?.country}`}
                    </h1>

                    <div className={styles['flex-container']}>
                        <section>
                            <h3 className={styles.sectionTitle}>Destination Info</h3>
                            <Form data={data} destinationId={destinationId} />
                        </section>
                        <MemoizedEditImages
                            imagesData={data?.imageUrls}
                            destinationId={data?._id}
                            deleteImageHandler={deleteImageHandler}
                            isLoading={isDeleteImgLoading}
                        />
                    </div>
                    <MemoizedPlacesShowcase
                        placesData={data?.places}
                        destinationId={data?._id}
                    />
                </>
            )}
        </div>
    );
};
