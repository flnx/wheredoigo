import { useParams } from 'react-router-dom';
import { useGetDestinationToEdit } from '../../hooks/queries/useGetDestinationToEdit';

// Components
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { EditImages } from './components/EditImages/EditImages';
import { Form } from './components/Form/Form';

import { extractServerErrorMessage } from '../../utils/utils';

import styles from './EditDestination.module.css';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);

    if (error) return <h1>{extractServerErrorMessage(error)}</h1>;

    const destinationTitle = `${data?.city}, ${data?.country}`;

    return (
        <div className="container">
            {isLoading || !data ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className={styles.destinationTitle}>
                        Edit {destinationTitle}
                    </h1>
                    <div className={styles['flex-container']}>
                        <Form 
                            data={data} 
                            destinationId={destinationId} 
                        />

                        <EditImages
                            imagesData={data.imageUrls}
                            destinationId={destinationId}
                        />
                    </div>
                    <PlacesShowcase 
                        placesData={data.places} 
                        destinationId={destinationId} 
                    />
                </>
            )}
        </div>
    );
};
